import React, { useEffect, useState } from "react";
import { db, auth } from '../../firebase/firebase';

import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { FiPackage, FiCalendar, FiUser, FiMail, FiHome, FiCreditCard, FiShoppingCart, FiDollarSign, FiX } from "react-icons/fi";
import "./Order.css";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const fetchOrders = async () => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("uid", "==", user.uid));
      const snapshot = await getDocs(q);

      const userOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      userOrders.sort((a, b) => new Date(b.orderedAt) - new Date(a.orderedAt));
      setOrders(userOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    const confirm = window.confirm("Are you sure you want to cancel this order?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "orders", orderId));
      alert("Order cancelled successfully.");
      fetchOrders();
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("Failed to cancel order.");
    }
  };

  const toggleExpandOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (!auth.currentUser) {
    return (
      <div className="auth-message">
        <h2>🔒 Access Restricted</h2>
        <p>Please login to view your order history</p>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2><FiPackage /> Order History</h2>
        <p className="orders-count">{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <img src="https://cdn.dribbble.com/users/204955/screenshots/4930541/media/86a427a0dbfd6daa1a410b49ec9b5742.png" alt="No orders" />
          <h3>No orders yet</h3>
          <p>Your order history will appear here</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className={`order-card ${expandedOrder === order.id ? 'expanded' : ''}`}
            >
              <div className="order-summary" onClick={() => toggleExpandOrder(order.id)}>
                <div className="order-id">
                  <span className="order-label">ORDER</span>
                  <span className="order-value">#{order.id.slice(0, 8).toUpperCase()}</span>
                </div>
                <div className="order-date">
                  <FiCalendar />
                  <span>{new Date(order.orderedAt).toLocaleDateString()}</span>
                </div>
                <div className="order-total">
                  <FiDollarSign />
                  <span>₹{order.totalPrice}</span>
                </div>
                <div className="order-items-count">
                  <FiShoppingCart />
                  <span>{order.totalItems} item{order.totalItems !== 1 ? 's' : ''}</span>
                </div>
                <div className="order-status">
                  <span className="status-badge">Processing</span>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="order-details">
                  <div className="details-grid">
                    <div className="detail-item">
                      <FiUser className="detail-icon" />
                      <div>
                        <p className="detail-label">Customer</p>
                        <p className="detail-value">{order.username}</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <FiMail className="detail-icon" />
                      <div>
                        <p className="detail-label">Email</p>
                        <p className="detail-value">{order.email}</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <FiHome className="detail-icon" />
                      <div>
                        <p className="detail-label">Delivery Address</p>
                        <p className="detail-value">{order.address}</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <FiCreditCard className="detail-icon" />
                      <div>
                        <p className="detail-label">Payment Method</p>
                        <p className="detail-value">{order.paymentMethod || "Cash on Delivery"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="order-items-section">
                    <h4>Order Items</h4>
                    <ul className="items-list">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="item">
                          <img 
                            src={item.image || "https://via.placeholder.com/50"} 
                            alt={item.name} 
                            className="item-image" 
                          />
                          <div className="item-info">
                            <p className="item-name">{item.name}</p>
                            <p className="item-price">₹{item.price} × {item.quantity}</p>
                          </div>
                          <p className="item-total">₹{item.price * item.quantity}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="order-actions">
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancel(order.id)}
                    >
                      <FiX /> Cancel Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;