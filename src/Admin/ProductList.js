import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './Admin.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const productsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(productsArray);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    fetchProducts();
    alert('❌ Product deleted');
  };

  return (
    <div className="admin-list">
      <h2>Manage Products</h2>
      <div className="product-grid">
        {products.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <p>Category: {item.category}</p>
            <button onClick={() => handleDelete(item.id)}>🗑️ Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;