import React, { useEffect, useState } from 'react'; // React hooks import kiye
import { useNavigate } from 'react-router-dom'; // React Router se navigation ke liye hook import kiya
import { db } from './firebase'; // Firebase configuration file import kiya
import { collection, getDocs, doc, onSnapshot } from 'firebase/firestore'; // Firestore database functions import kiye
import './Men.css'; // Component ke styling ke liye CSS file import kiya

// Men component define kiya hai
function Men() {
  // --- State Variables ---
  // useNavigate hook se `Maps` function milta hai, jo programmatic navigation ke liye use hota hai.
  const navigate = useNavigate();

  // `products` state: Yeh state saare men's products store karegi jo Firebase se fetch honge.
  // Shuru mein yeh ek empty array [] hogi.
  const [products, setProducts] = useState([]);

  // `ratingsMap` state: Yeh state har product ke naam ke hisaab se uski average rating store karegi.
  // Jaise: { "Product A": "4.5", "Product B": "3.8" }. Shuru mein yeh ek empty object {} hogi.
  const [ratingsMap, setRatingsMap] = useState({});

  // `selectedPrice` state: Yeh state current selected price filter option ko store karegi.
  // Default value 'all' hai, matlab shuru mein saare products dikhenge.
  const [selectedPrice, setSelectedPrice] = useState('all');

  // --- useEffect Hooks (Side Effects Management) ---

  // ✅ PRODUCTS FETCHING LOGIC
  // Yeh `useEffect` hook Firebase se products ko fetch karne ke liye use hota hai.
  // Yeh hook sirf component ke **pehli baar render** hone par chalega (empty dependency array `[]` ke kaaran).
  useEffect(() => {
    // `fetchProducts` ek asynchronous function hai jo data fetch karne ka kaam karta hai.
    const fetchProducts = async () => {
      try {
        // 'menProducts' collection ka reference liya. Yeh Firebase Firestore mein aapki collection ka naam hai.
        const productRef = collection(db, 'menProducts');
        // `getDocs` function use karke is collection se saare documents (products) ko get kiya.
        const snapshot = await getDocs(productRef);
        // `snapshot.docs` ek array hai jismein har document ka data hota hai.
        // `map` function use karke har document se uske data ko extract kiya aur `productList` array banaya.
        const productList = snapshot.docs.map(doc => ({
          id: doc.id, // Har document ki unique ID ko `id` property mein add kiya (React `key` prop ke liye zaroori).
          ...doc.data() // Baki saara product data (jaise `name`, `price`, `img`, etc.) spread operator se add kiya.
        }));
        // `setProducts` function use karke `products` state ko fetch kiye gaye products se update kiya.
        setProducts(productList);
      } catch (error) {
        // Agar products fetch karte waqt koi error aati hai, toh use console mein log kiya.
        console.error("Products fetch karte waqt error hui:", error);
      }
    };

    // `fetchProducts` function ko call kiya taaki products load ho saken.
    fetchProducts();
  }, []); // Empty dependency array `[]` ka matlab hai ki yeh hook sirf component mount hone par chalega aur dobara nahi.

  // ✅ REALTIME RATINGS LOGIC
  // Yeh `useEffect` hook Firebase se products ki realtime ratings listen karne ke liye use hota hai.
  // Yeh hook tab chalega jab `products` state update hogi (yani, jab products fetch ho jaayenge).
  // Har product ke liye ek realtime listener set kiya jayega ratings ko track karne ke liye.
  useEffect(() => {
    // `unsubscribes` array: Yeh har listener ke liye ek unsubscribe function store karega.
    // Component unmount hone par in functions ko call karke memory leaks se bachenge.
    const unsubscribes = products.map((product) => {
      // 'ratings' collection mein specific product ke naam se document ka reference liya.
      // Yeh assume kiya gaya hai ki ratings document ka ID product ke `name` ke barabar hai.
      const docRef = doc(db, 'ratings', product.name);

      // `onSnapshot` listener lagaya: Jab bhi is rating document mein change hoga, yeh callback function chalega.
      return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          // Agar rating document Firebase mein exist karta hai.
          const ratingsArray = docSnap.data().ratings || []; // `ratings` array ko liya, agar nahi hai toh empty array.
          // Average rating calculate kiya:
          // Agar `ratingsArray` mein items hain, toh unki ratings ka sum karke total count se divide kiya.
          // Warna, average 0 hoga.
          const avg = ratingsArray.length > 0
            ? ratingsArray.reduce((sum, r) => sum + (r.rating || 0), 0) / ratingsArray.length
            : 0;
          const avgRating = avg.toFixed(1); // Average ko ek decimal place tak format kiya (e.g., 4.3).

          // `setRatingsMap` function use karke `ratingsMap` state ko update kiya.
          // Spread operator (`...prev`) se previous state ko copy kiya, fir current product ki rating add ya update ki.
          setRatingsMap((prev) => ({ ...prev, [product.name]: avgRating }));
        } else {
          // Agar rating document exist nahi karta hai, toh us product ke liye rating "0.0" set ki.
          setRatingsMap((prev) => ({ ...prev, [product.name]: "0.0" }));
        }
      });
    });

    // Cleanup function:
    // Jab component unmount hota hai ya `products` dependency change hoti hai,
    // toh saare realtime listeners ko unsubscribe karo taaki memory leaks na hon.
    return () => unsubscribes.forEach((unsub) => unsub());
  }, [products]); // Dependency array mein `products` hai, matlab yeh hook `products` state change hone par re-run hoga.

  // --- Helper Functions ---

  // `renderStars` function: Yeh rating value ke hisaab se star icons render karega.
  // Example: 4.5 rating ke liye 4 full stars aur 1 half star dikhayega.
  const renderStars = (rating) => {
    const full = Math.floor(rating); // Pure bhare hue stars ki sankhya (e.g., 4.5 -> 4)
    const half = rating % 1 >= 0.5; // Kya aadha star bhi hai? (e.g., 4.5 -> true)
    const empty = 5 - full - (half ? 1 : 0); // Khali stars ki sankhya (total 5 stars hote hain)

    // '★' (full star), '½' (half star), '☆' (empty star) unicode characters use kiye hain.
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
  };

  // `goToDetails` function: Jab user kisi product card par click karega, toh yeh function call hoga.
  // Yeh user ko product details page par navigate karega.
  const goToDetails = (product, index) => {
    // `Maps` function use karke URL change kiya.
    // `/product/${index}`: Yahan `index` ke bajaye `product.id` use karna behtar hoga
    // kyunki `id` unique aur stable hota hai, jabki `index` sort ya filter karne par badal sakta hai.
    navigate(`/product/${index}`, {
      // `state` object mein product ka poora data aur category ('men') pass kiya hai.
      // Isse details page par product data URL mein expose hue bina mil jayega.
      state: { product, category: 'men' }
    });
  };

  // ✅ FILTER LOGIC
  // `filterByPrice` function: Yeh products ko `selectedPrice` state ke according filter karega.
  const filterByPrice = (product) => {
    // Product ke `price` string se '₹' symbol hata kar use integer mein convert kiya.
    const price = parseInt(product.price.replace('₹', ''));

    // `switch` statement use karke `selectedPrice` ke alag-alag cases handle kiye.
    switch (selectedPrice) {
      case 'below500': return price < 500; // 500 se kam price wale products
      case '500to1000': return price >= 500 && price <= 1000; // 500 se 1000 ke beech wale products
      case '1000to2000': return price > 1000 && price <= 2000; // 1000 se 2000 ke beech wale products
      case 'above2000': return price > 2000; // 2000 se upar price wale products
      default: return true; // 'all' selected hone par ya koi match na hone par, saare products dikhao.
    }
  };

  // `filteredProducts` variable: Yeh `products` array ko `filterByPrice` function se filter karta hai.
  // Iska result ek naya array hota hai jismein sirf filter kiye hue products hote hain.
  const filteredProducts = products.filter(filterByPrice);

  // --- Component JSX (UI Rendering) ---
  return (
    <div className="men-section"> {/* Main container for the Men's collection page */}
      <h1>Men's Collection</h1> {/* Page ka heading */}

      {/* Filter options container */}
      <div className="filter-container">
        <label>Filter by Price:</label> {/* Filter label */}
        {/* Dropdown (`select`) menu price filter ke liye */}
        {/* `value` prop `selectedPrice` state se bind kiya hai, aur `onChange` event par state update hoti hai. */}
        <select value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
          <option value="all">All</option> {/* All products option */}
          <option value="below500">Below ₹500</option> {/* Below ₹500 option */}
          <option value="500to1000">₹500–1000</option> {/* ₹500 to ₹1000 option */}
          <option value="1000to2000">₹1000–2000</option> {/* ₹1000 to ₹2000 option */}
          <option value="above2000">Above ₹2000</option> {/* Above ₹2000 option */}
        </select>
      </div>

      {/* Men's product gallery grid */}
      <div className="men-gallery">
        {/* `filteredProducts` array par `map` karke har product ke liye ek card render kiya. */}
        {filteredProducts.map((item, idx) => (
          // Har product card ek `div` mein hai.
          // `key={idx}`: React lists mein performance aur stability ke liye unique `key` prop zaroori hai.
          // Yahan `idx` (index) use kiya hai, but `item.id` (agar product data mein available ho) zyada behtar hota hai.
          // `onClick` par `goToDetails` function call kiya product details page par jaane ke liye.
          <div className="men-card" key={idx} onClick={() => goToDetails(item, idx)}>
            {/* Product image */}
            <img src={item.img} alt={item.name} className="men-img" />
            {/* Product details section */}
            <div className="men-details">
              <h3>{item.name}</h3> {/* Product ka naam */}
              <p className="men-price">{item.price}</p> {/* Product ka price */}
              {/* Rating line: Star icon, `renderStars` function se visual stars, aur average rating. */}
              <p className="rating-line">
                ⭐ {renderStars(Number(ratingsMap[item.name] || 0))} ({ratingsMap[item.name] || "0.0"})
              </p>
              {/* View Details button */}
              <button className="cart-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Men; // `Men` component ko export kiya hai takii yeh doosri files mein import aur use ho sake.