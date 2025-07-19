import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { FiPlus, FiList, FiTrash2, FiChevronRight } from 'react-icons/fi';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [tab, setTab] = useState('add');
  const [form, setForm] = useState({ name: '', price: '', img: '', category: '' });
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const categories = ['menProducts', 'womenProducts', 'kidsProducts'];
      let all = [];

      for (let category of categories) {
        const snap = await getDocs(collection(db, category));
        const data = snap.docs.map(docu => ({
          id: docu.id,
          ...docu.data(),
          category,
        }));
        all = [...all, ...data];
      }

      all.sort((a, b) => {
        return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
      });

      setProducts(all);
    } catch (error) {
      console.error("Error fetching products: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [tab]);

  const handleAdd = async () => {
    const { name, price, img, category } = form;
    if (!name || !price || !img || !category) {
      alert('❗ All fields are required!');
      return;
    }

    setIsLoading(true);
    try {
      const collectionName = `${category}Products`;
      await addDoc(collection(db, collectionName), {
        name,
        price: Number(price),
        img,
        createdAt: Timestamp.now(),
        category: collectionName,
      });
      alert('✅ Product Added!');
      setForm({ name: '', price: '', img: '', category: '' });
      setTab('list');
    } catch (error) {
      console.error("Error adding product: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id, category) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, category, id));
        alert('✅ Product Deleted!');
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product: ", error);
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <div className="breadcrumb">
          <span>Home</span>
          <FiChevronRight />
          <span className="active">Products</span>
        </div>
      </div>

      <div className="admin-tabs">
        <button 
          className={tab === 'add' ? 'active' : ''} 
          onClick={() => setTab('add')}
        >
          <FiPlus /> Add Product
        </button>
        <button 
          className={tab === 'list' ? 'active' : ''} 
          onClick={() => setTab('list')}
        >
          <FiList /> Product List
        </button>
      </div>

      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      {tab === 'add' && (
        <div className="admin-form-container">
          <div className="form-card">
            <h3>Add New Product</h3>
            <div className="admin-form">
              <div className="form-group">
                <label>Product Name</label>
                <input 
                  type="text" 
                  placeholder="Enter product name" 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })} 
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input 
                  type="number" 
                  placeholder="Enter price" 
                  value={form.price} 
                  onChange={(e) => setForm({ ...form, price: e.target.value })} 
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input 
                  type="text" 
                  placeholder="Enter image URL" 
                  value={form.img} 
                  onChange={(e) => setForm({ ...form, img: e.target.value })} 
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select 
                  value={form.category} 
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                </select>
              </div>
              <button className="submit-btn" onClick={handleAdd}>
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === 'list' && (
        <div className="product-list-container">
          {products.length === 0 ? (
            <div className="empty-state">
              <img src="https://cdn.dribbble.com/users/888330/screenshots/2653750/media/b7459526f1b1671179b80ce01a793f76.png" alt="No products" />
              <p>No products found. Add some products to get started!</p>
            </div>
          ) : (
            <>
              <div className="latest-product">
                <h3>Latest Product</h3>
                <div className="product-card featured">
                  <div className="product-badge">NEW</div>
                  <img src={products[0].img} alt={products[0].name} />
                  <div className="product-info">
                    <h4>{products[0].name}</h4>
                    <div className="product-meta">
                      <span className="price">₹{products[0].price}</span>
                      <span className={`category ${products[0].category.replace('Products', '').toLowerCase()}`}>
                        {products[0].category.replace('Products', '').toUpperCase()}
                      </span>
                    </div>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(products[0].id, products[0].category)}
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              </div>

              <div className="product-grid">
                <h3>All Products ({products.length})</h3>
                <div className="grid">
                  {products.slice(1).map(item => (
                    <div key={item.id} className="product-card">
                      <img src={item.img} alt={item.name} />
                      <div className="product-info">
                        <h4>{item.name}</h4>
                        <div className="product-meta">
                          <span className="price">₹{item.price}</span>
                          <span className={`category ${item.category.replace('Products', '').toLowerCase()}`}>
                            {item.category.replace('Products', '').toUpperCase()}
                          </span>
                        </div>
                        <button 
                          className="delete-btn" 
                          onClick={() => handleDelete(item.id, item.category)}
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;