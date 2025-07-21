import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './Home.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useCart } from '../../context/CartContext';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  // Flipkart-style banners (keep these for homepage feel)
  const bannerImages = [
    '/image/slider1.jpg',
    '/image/slider2.jpg',
    '/image/slider3.jpg',
    '/image/slider4.jpg',
  ];

  // Categories: Purani Unsplash waali
  const galleryItems = [
    {
      img: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=800&q=80",
      title: "Women's Collection",
      subtitle: "Elegant styles for every occasion",
      color: "linear-gradient(135deg, #FF9E9E 0%, #FF6B6B 100%)",
      link: "/women"
    },
    {
      img: "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?auto=format&fit=crop&w=800&q=80",
      title: "Men's Fashion",
      subtitle: "Premium quality & modern designs",
      color: "linear-gradient(135deg, #A0E7E5 0%, #60C5C2 100%)",
      link: "/men"
    },
    {
      img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      title: "Kids' World",
      subtitle: "Fun & comfortable outfits",
      color: "linear-gradient(135deg, #B5EAEA 0%, #85CACA 100%)",
      link: "/kids"
    },
    
  ];

  // Accessories: Tumhari purani images
  const accessories = [
    {
      img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=480&q=80",
      name: "Men's Designer Watch",
      price: "₹2,499",
      category: "men",
      link: "/men"
    },
    {
      img: "https://homafy.com/wp-content/uploads/2020/05/Customised-leather-wallets-1024x1024.jpg",
      name: "Men's Leather Wallet",
      price: "₹1,799",
      category: "men",
      link: "/men"
    },
    {
      img: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=480&q=80",
      name: "Women's Silver Diamond Ring",
      price: "₹3,299",
      category: "women",
      link: "/women"
    },
    {
      img: "https://m.media-amazon.com/images/I/71tlUBIDk1L._UY1100_.jpg",
      name: "Women's Silk Scarf",
      price: "₹1,299",
      category: "women",
      link: "/women"
    },
    {
      img: "https://staranddaisy.in/wp-content/uploads/2024/03/new-school-bag-for-Kids-Blue-1.jpg",
      name: "Kids' Backpack",
      price: "₹899",
      category: "kids",
      link: "/kids"
    },
    {
      img: "https://m.media-amazon.com/images/I/41MAaQxnTsL._UF1000,1000_QL80_.jpg",
      name: "Kids' Water Bottle",
      price: "₹499",
      category: "kids",
      link: "/kids"
    },
    {
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      name: "Trendy Sunglasses",
      price: "₹1,099",
      category: "accessory",
      link: "/accessories"
    },
    {
      img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
      name: "Classic Cap",
      price: "₹499",
      category: "accessory",
      link: "/accessories"
    }
  ];

  return (
    <div className="home-container">
      {/* -- HERO -- */}
      <div className="hero-section">
        <h1 className="hero-title">
          <span className="brand-accent">Just One Click</span>
          <span className="brand-moto-text"> – Shopping Made Magical</span>
        </h1>
        <p className="hero-subtitle">
          Welcome to a world of exclusive deals, iconic styles, and trending products.<br />
          <b>Just One Click</b> se <i>shopping</i> is now fun, easy, and 100% real!
        </p>
        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search your favorites – shoes, mobiles, kurtis, watches…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn" tabIndex={-1}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* -- SLIDER -- */}
      <div className="slider-container">
        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper flipkart-swiper"
        >
          {bannerImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="slider-content">
                <img src={img} alt={`Banner-${idx+1}`} className="slider-image flipkart-banner" />
                <div className="flipkart-slider-overlay"></div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </Swiper>
      </div>

      {/* -- CATEGORIES -- */}
      <div className="section-header">
        <h2>Shop By Category</h2>
        <p>Explore our handpicked collections for Women, Men, Kids & Accessories.</p>
      </div>
      <div className="gallery-grid">
        {galleryItems.map((item, i) => (
          <div className="gallery-card" key={i} onClick={() => navigate(item.link)}>
            <div className="card-image-container">
              <img src={item.img} alt={item.title} className="gallery-image" draggable="false" />
              <div className="image-overlay" style={{ background: item.color }} />
            </div>
            <div className="card-content">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
              <button className="explore-btn" tabIndex={-1}>
                Explore
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* -- ACCESSORIES -- */}
      <div className="section-header">
        <h2>Must-Have Accessories</h2>
        <p>Smart watches, wallets, sunglasses and more. Upgrade your add-ons today!</p>
      </div>
      <div className="accessories-section">
        <div className="accessories-grid">
          {accessories.map((item, i) => (
            <div className="accessory-card" key={i} onClick={() => navigate(item.link)}>
              <div className="accessory-image-container">
                <img src={item.img} alt={item.name} className="accessory-image" draggable="false" />
                <div className="category-tag">{item.category.toUpperCase()}</div>
                <button className="quick-view-btn">Quick View</button>
              </div>
              <div className="accessory-info">
                <h3>{item.name}</h3>
                <p className="price">{item.price}</p>
                <button className="add-to-cart-btn" onClick={e => {
                  e.stopPropagation();
                  addToCart({
                    name: item.name,
                    price: Number(item.price.replace(/[₹,]/g, '').trim()),
                    img: item.img,
                  });
                  // Custom glassy toast
                  const toast = document.createElement('div');
                  toast.className = 'cart-toast';
                  toast.innerText = "✅ Added to Cart!";
                  document.body.appendChild(toast);
                  setTimeout(() => {
                    toast.classList.add('show');
                    setTimeout(() => {
                      toast.classList.remove('show');
                      setTimeout(() => document.body.removeChild(toast), 400);
                    }, 1500);
                  }, 100);
                }}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default Home;
