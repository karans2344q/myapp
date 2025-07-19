import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { collection, getDocs, doc, onSnapshot } from 'firebase/firestore';
import './Kids.css';

function Kids() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [ratingsMap, setRatingsMap] = useState({});
  const [selectedPrice, setSelectedPrice] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      const productRef = collection(db, 'kidsProducts');
      const snapshot = await getDocs(productRef);
      const productList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const unsubscribes = products.map((product) => {
      const docRef = doc(db, 'ratings', product.name);
      return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const ratingsArray = docSnap.data().ratings || [];
          const avg = ratingsArray.length
            ? ratingsArray.reduce((sum, r) => sum + (r.rating || 0), 0) / ratingsArray.length
            : 0;
          setRatingsMap((prev) => ({ ...prev, [product.name]: avg.toFixed(1) }));
        } else {
          setRatingsMap((prev) => ({ ...prev, [product.name]: "0.0" }));
        }
      });
    });
    return () => unsubscribes.forEach(unsub => unsub());
  }, [products]);

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
  };

  const filterByPrice = (product) => {
    const numericPrice = parseFloat((product.price || "0").toString().replace(/[^\d.]/g, '')) || 0;
    switch (selectedPrice) {
      case 'below500': return numericPrice < 500;
      case '500to1000': return numericPrice >= 500 && numericPrice <= 1000;
      case '1000to2000': return numericPrice > 1000 && numericPrice <= 2000;
      case 'above2000': return numericPrice > 2000;
      default: return true;
    }
  };

  const goToDetails = (product, index) => {
    navigate(`/product/${index}`, {
      state: { product, category: 'kids' }
    });
  };

  const filteredProducts = products.filter(filterByPrice);

  return (
    <div className="kids-section">
      <h1>Kids' Collection</h1>
      <div className="filter-container">
        <label>Filter by Price:</label>
        <select value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
          <option value="all">All</option>
          <option value="below500">Below ₹500</option>
          <option value="500to1000">₹500–1000</option>
          <option value="1000to2000">₹1000–2000</option>
          <option value="above2000">Above ₹2000</option>
        </select>
      </div>
      <div className="kids-gallery">
        {filteredProducts.map((item, idx) => (
          <div className="kids-card" key={idx} onClick={() => goToDetails(item, idx)}>
            <img src={item.img} alt={item.name} className="kids-img" />
            <div className="kids-details">
              <h3>{item.name}</h3>
              <p className="kids-price">₹{parseFloat((item.price || "0").toString().replace(/[^\d.]/g, ''))}</p>
              <p className="rating-line">
                ⭐ {renderStars(Number(ratingsMap[item.name] || 0))} ({ratingsMap[item.name] || "0.0"})
              </p>
              <button className="cart-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Kids;
