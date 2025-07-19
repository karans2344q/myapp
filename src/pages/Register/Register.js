// ✅ Full React Admin Registration with Role and Firestore (Final Code)

import React, { useState } from 'react';
import './Register.css';
import { db, auth } from '../../firebase/firebase';

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
    role: '',
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
        role: form.role,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", user.uid), userData);

      alert("✅ Registration Successful!");
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err);
      alert("❌ Registration Failed: " + err.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Create Account</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address (optional)"
          value={form.address}
          onChange={handleChange}
        />

       <select
  name="role"
  value={form.role}
  onChange={handleChange}
  className="role-selector"
>
  <option value="" disabled selected>Select Role</option>
  <option value="user">User</option>
  <option value="admin">Admin</option>
</select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
