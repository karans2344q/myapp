import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

// Components
import Header from './Headers';
import Navbar from './Navbar';
import Footer from './Footers';
import { CartProvider } from './CartContext';

// Pages
import Home from './Home';
import About from './About';
import Contact from './Contact';
import LoginPage from './Login';
import Register from './Register';
import Profile from './Profile';
import Men from './Men';
import Women from './Women';
import Kids from './Kids';
import Cart from './Cart';
import Checkout from './Checkout';
import Order from './Order';
import ProductDetail from './ProductDetail';
import UploadAllProducts from './UploadAllProducts';

// Admin
import AdminDashboard from './Admin/AdminDashboard';

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
      <Header />
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
