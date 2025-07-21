import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase/firebase';

// Components

import Navbar from './components/Navbar/Navbar';  
import Footer from './components/Footer/Footers';
import { CartProvider } from './context/CartContext';  

// Pages
import Home from './pages/Home/Home';
import About from './pages/About';
import Contact from './pages/Contact/Contact';
import LoginPage from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Men from './pages/Men/Men';
import Women from './pages/Women/Women';
import Kids from './pages/Kids/Kids';
import Cart from './components/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Order from './pages/Orders/Order';
import ProductDetail from './components/Product/ProductDetail';
import UploadAllProducts from './UploadAllProducts';

// Admin
import AdminDashboard from './pages/Admin/AdminDashboard';

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            localStorage.setItem("userData", JSON.stringify(data));
            setUserData(data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        localStorage.removeItem("userData");
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <CartProvider>
      
      <Navbar userData={userData} setUserData={setUserData} />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage setUserData={setUserData} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile userData={userData} />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout userData={userData} />} />
          <Route path="/order" element={<Order />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/upload-all" element={<UploadAllProducts />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
      <Footer />
    </CartProvider>
  );
}

export default App;
