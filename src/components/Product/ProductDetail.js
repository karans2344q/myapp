import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { db, auth } from '../../firebase/firebase';

import { FiShoppingCart, FiArrowLeft, FiTruck, FiStar } from 'react-icons/fi';
import './ProductDetail.css';

import { doc, onSnapshot, setDoc, arrayUnion } from 'firebase/firestore';

function ProductDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [averageRating, setAverageRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [newReview, setNewReview] = useState('');
  const [allReviews, setAllReviews] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');

  const product = state?.product;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.uid);
      } else {
        setIsLoggedIn(false);
        setUserId('');
      }
    });

    if (product) {
      const ref = doc(db, 'ratings', product.name);
      const unsubRating = onSnapshot(ref, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const ratings = data.ratings || [];
          setAllReviews(ratings);
          const avg = ratings.length
            ? ratings.reduce((sum, r) => sum + (r.rating || 0), 0) / ratings.length
            : 0;
          setAverageRating(Number(avg.toFixed(1)));
        }
      });
      return () => { unsubscribe(); unsubRating(); };
    }
    return unsubscribe;
  }, [product]);

  const handleRatingSubmit = async () => {
    if (!isLoggedIn) {
      alert("Please login to give rating and review!");
      return navigate('/login');
    }
    if (!userRating) return;
    const ref = doc(db, 'ratings', product.name);
    const payload = {
      user: userId,
      rating: userRating,
      review: newReview || 'No comment',
      timestamp: Date.now()
    };
    await setDoc(ref, { ratings: arrayUnion(payload) }, { merge: true });
    setUserRating(0);
    setNewReview('');
  };

  const handleAddToCart = () => {
    const priceValue = parseInt(product.price.replace("₹", ""));
    addToCart({ name: product.name, image: product.img, price: priceValue, quantity });
    document.querySelector('.add-to-cart-toast').classList.add('show');
    setTimeout(() => {
      document.querySelector('.add-to-cart-toast').classList.remove('show');
    }, 3000);
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      alert("Please login to Buy Now!");
      return navigate('/login');
    }
    const priceValue = parseInt(product.price.replace("₹", ""));
    const buyNowItem = {
      name: product.name,
      image: product.img,
      price: priceValue,
      quantity
    };
    navigate('/checkout', { state: { buyNowItem } });
  };

  if (!product) {
    return (
      <div className="not-found-container">
        <h2>Product Not Found</h2>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="add-to-cart-toast">🛒 Added to cart successfully!</div>

      <div className="product-detail-container">
        <div className="product-gallery">
          <img src={product.img} alt={product.name} className="main-product-image" />
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          <div className="rating-container">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className={i < Math.floor(averageRating) ? 'filled' : ''} />
              ))}
              <span className="avg-rating">({averageRating})</span>
            </div>
          </div>
          <div className="price-container">
            <span className="current-price">{product.price}</span>
            <span className="discount-badge">25% OFF</span>
          </div>
          <div className="shipping-info">
            <FiTruck /> Free delivery on orders over ₹999
          </div>
          <div className="product-highlights">
            <h3>Product Highlights</h3>
            <ul>
              <li>Durable build with kids-friendly material</li>
              <li>Bright color and engaging design</li>
              <li>Ideal for age 3-10</li>
              <li>1 Year Warranty</li>
            </ul>
          </div>
          <div className="quantity-selector">
            <label>Qty:</label>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>
          <div className="action-buttons">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <FiShoppingCart /> Add to Cart
            </button>
            <button className="buy-now-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
          <button className="back-to-shop" onClick={() => navigate(-1)}>
            <FiArrowLeft /> Back
          </button>
        </div>
      </div>

      <div className="review-section">
        <h3>Customer Reviews</h3>
        {allReviews.length === 0 ? (
          <p>No reviews yet. Be the first!</p>
        ) : (
          <ul className="review-list">
            {allReviews.map((r, i) => (
              <li key={i}>⭐ {r.rating} – {r.review}</li>
            ))}
          </ul>
        )}
        {isLoggedIn ? (
          <div className="add-review">
            <label>Your Rating:</label>
            <select value={userRating} onChange={(e) => setUserRating(Number(e.target.value))}>
              <option value={0}>Select</option>
              <option value={5}>⭐⭐⭐⭐⭐</option>
              <option value={4}>⭐⭐⭐⭐</option>
              <option value={3}>⭐⭐⭐</option>
              <option value={2}>⭐⭐</option>
              <option value={1}>⭐</option>
            </select>
            <textarea placeholder="Write a review..." value={newReview} onChange={(e) => setNewReview(e.target.value)} />
            <button onClick={handleRatingSubmit}>Submit</button>
          </div>
        ) : (
          <div className="login-alert">
            <p>Please login to submit review.</p>
            <button onClick={() => navigate('/login')}>Login Now</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;