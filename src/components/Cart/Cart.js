import React from 'react';
import { useCart } from '../../context/CartContext';

import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, userId } = useCart();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (userId !== 'guest') {
      navigate('/checkout');
    } else {
      alert("Please login to proceed to checkout.");
      navigate('/login');
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1 className="cart-title">Your Shopping Cart</h1>
        <div className="cart-summary">
          <span>{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
          <span className="total-price">₹{totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <p>Your cart is empty</p>
          <button className="continue-shopping" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="item-image">
                  <img 
                    src={item.img || item.image} 
                    alt={item.name} 
                  />
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">₹{item.price}</p>
                </div>
                <div className="item-quantity">
                  <button
                    onClick={() => updateQuantity(item.name, item.quantity - 1)}
                    className="qty-btn"
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="qty">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.name, item.quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
                <div className="item-total">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.name)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="checkout-section">
            <div className="checkout-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <button className="continue-shopping" onClick={() => navigate('/')}>
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;