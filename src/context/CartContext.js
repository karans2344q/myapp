import React, { createContext, useContext, useEffect, useState } from 'react';
import { db, auth } from '../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState('guest');

  // ✅ Handle login/logout state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId('guest');
        setCartItems([]);
      }
    });
    return unsubscribe;
  }, []);

  // ✅ Fetch cart from Firestore when user logs in
  useEffect(() => {
    const fetchCart = async () => {
      if (userId === 'guest') {
        setCartItems([]);
        return;
      }
      try {
        const cartDoc = await getDoc(doc(db, 'carts', userId));
        if (cartDoc.exists()) {
          setCartItems(cartDoc.data()?.items || []);
        } else {
          setCartItems([]);
        }
      } catch (err) {
        console.error("❌ Cart fetch error:", err.message);
      }
    };
    fetchCart();
  }, [userId]);

  const saveCart = async (items) => {
    if (userId === 'guest') return;
    try {
      await setDoc(doc(db, 'carts', userId), { items });
    } catch (err) {
      console.error("❌ Cart save error:", err.message);
    }
  };

  // ✅ Add to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.name === product.name);
      let updated;
      if (existing) {
        updated = prev.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updated = [
          ...prev,
          {
            name: product.name,
            price: typeof product.price === 'string' ? parseInt(product.price.replace('₹', '')) : product.price,
            quantity: 1,
            image: product.img || product.image,
          }
        ];
      }
      saveCart(updated);
      return updated;
    });
  };

  // ✅ Update quantity
  const updateQuantity = (name, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev => {
      const updated = prev.map(item =>
        item.name === name ? { ...item, quantity } : item
      );
      saveCart(updated);
      return updated;
    });
  };

  // ✅ Remove from cart
  const removeFromCart = (name) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.name !== name);
      saveCart(updated);
      return updated;
    });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        cartCount,
        userId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
