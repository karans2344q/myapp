import React, { useState } from 'react';
import './Register.css';
import { db, auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    role: 'user',  // Default role is user
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return alert("❌ Passwords do not match!");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email.trim().toLowerCase(),
        form.password
      );
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        username: form.username.trim(),
        email: form.email.trim().toLowerCase(),
        address: form.address.trim(),
        role: form.role,  // ✅ Saving role in Firestore
        createdAt: new Date().toISOString()
      };

      await setDoc(doc(db, "users", user.uid), userData);

      alert("✅ Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      alert("❌ Registration failed: " + err.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address (optional)" value={form.address} onChange={handleChange} />
        
        {/* ✅ Admin or User */}
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
