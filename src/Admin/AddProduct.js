import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './Admin.css';

const AddProduct = () => {
  const [product, setProduct] = useState({ name: '', price: '', img: '', category: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.name || !product.price || !product.img || !product.category) return alert('Please fill all fields');

    try {
      await addDoc(collection(db, 'products'), {
        name: product.name,
        price: parseInt(product.price),
        img: product.img,
        category: product.category.toLowerCase(),
        createdAt: new Date().toISOString()
      });
      alert('✅ Product added successfully');
      setProduct({ name: '', price: '', img: '', category: '' });
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add product');
    }
  };

  return (
    <div className="admin-form">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Product Name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} required />
        <input type="text" placeholder="Price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} required />
        <input type="text" placeholder="Image URL" value={product.img} onChange={(e) => setProduct({ ...product, img: e.target.value })} required />
        <input type="text" placeholder="Category" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
