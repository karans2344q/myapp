import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-buttons">
        <button onClick={() => navigate('/admin/add')}>➕ Add Product</button>
        <button onClick={() => navigate('/admin/products')}>📦 Manage Products</button>
      </div>
    </div>
  );
};

export default AdminDashboard;