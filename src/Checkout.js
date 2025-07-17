import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { useCart } from "./CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const { cartItems, cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(true);

  const buyNowItem = location.state?.buyNowItem || null;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserInfo(data);
          setAddress(data.address || "");
        } else {
          console.warn("User data not found in Firestore");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handlePlaceOrder = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please login first.");
      return;
    }

    if (!address.trim()) {
      alert("Please enter your address.");
      return;
    }

    const itemsToOrder = buyNowItem
      ? [buyNowItem]
      : cartItems.length > 0
        ? cartItems
        : [];

    if (itemsToOrder.length === 0) {
      alert("Cart is empty or no item to checkout!");
      return;
    }

    try {
      await updateDoc(doc(db, "users", user.uid), { address });

      const orderId = `${user.uid}_${Date.now()}`;
      const orderData = {
        uid: user.uid,
        username: userInfo?.username || "",
        email: userInfo?.email || "",
        address,
        paymentMethod,
        items: itemsToOrder.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.img || item.image || "",
        })),
        totalItems: itemsToOrder.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: itemsToOrder.reduce((sum, item) => sum + item.price * item.quantity, 0),
        orderedAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "orders", orderId), orderData);

      alert("🎉 Order placed successfully!");
      navigate("/order");
    } catch (error) {
      console.error("Order Error:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading user details...</p>;
  }

  if (!auth.currentUser) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Please login to view checkout.</p>;
  }

  const orderItems = buyNowItem ? [buyNowItem] : cartItems;

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {userInfo && (
        <>
          <p><strong>Logged in as:</strong> {userInfo.username}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>

          <div className="form-group">
            <label>Address:</label><br />
            <textarea
              rows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address..."
              required
            />
          </div>

          <div className="form-group">
            <label>Payment Method:</label><br />
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option>Cash on Delivery</option>
              <option>UPI</option>
              <option>Credit Card</option>
              <option>Net Banking</option>
            </select>
          </div>

          <div className="order-summary">
            <p><strong>Total Items:</strong> {orderItems.reduce((sum, item) => sum + item.quantity, 0)}</p>
            <p><strong>Total Price:</strong> ₹{orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>
          </div>

          <button onClick={handlePlaceOrder} className="place-order-btn">
            🛒 Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
