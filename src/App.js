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

function App() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    createdAt: '',
    address: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData({
              username: data.username || '',
              email: data.email || '',
              createdAt: data.createdAt || '',
              address: data.address || ''
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserData({
          username: '',
          email: '',
          createdAt: '',
          address: ''
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <CartProvider>
      <Header />
      <Navbar 
        username={userData.username}
        setUsername={() => setUserData({
          username: '',
          email: '',
          createdAt: '',
          address: ''
        })}
      />
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
          <Route path="/upload-all" element={<UploadAllProducts />} /> {/* ✅ ADD किया */}
        </Routes>
      </div>
      <Footer />
    </CartProvider>
  );
}

export default App;
