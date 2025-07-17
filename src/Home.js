import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import './Home.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { useCart } from './CartContext';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  const bannerImages = [
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?...",
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?...",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?..."
  ];

  const galleryItems = [
    {
      img: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?...",
      title: "Women's Collection",
      subtitle: "Elegant styles for every occasion",
      color: "linear-gradient(135deg, #FF9E9E 0%, #FF6B6B 100%)",
      link: "/women"
    },
    {
      img: "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?...",
      title: "Men's Fashion",
      subtitle: "Premium quality & modern designs",
      color: "linear-gradient(135deg, #A0E7E5 0%, #60C5C2 100%)",
      link: "/men"
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYp0F...",
      title: "Kids' World",
      subtitle: "Fun & comfortable outfits",
      color: "linear-gradient(135deg, #B5EAEA 0%, #85CACA 100%)",
      link: "/kids"
    }
  ];

  const accessories = [
    {
      img: "https://tse3.mm.bing.net/th/id/OIP.H3NtQQalXSeD5Lkjl_D6JAHaHa?...",
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
      img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?...",
      name: "Women's Silver Dimond Ring",
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
    }
  ];

  const handleGalleryClick = (link) => {
    navigate(link);
  };

  const handleAccessoryClick = (link) => {
    navigate(link);
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Elevate Your Style</h1>
        <p className="hero-subtitle">
          Discover premium fashion for the entire family. Curated collections with the season's best looks.
        </p>
        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for products, brands, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="home-scroll-target"></div>

      <div className="slider-container">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          effect={'fade'}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true, el: '.swiper-pagination' }}
          navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
          modules={[Autoplay, EffectFade, Pagination, Navigation]}
          className="mySwiper"
        >
          {bannerImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="slider-content">
                <img src={image} alt={`Banner ${index + 1}`} className="slider-image" />
                <div className="slider-overlay"></div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </Swiper>
      </div>

      <div className="section-header">
        <h2>Shop By Category</h2>
        <p>Explore our carefully curated collections</p>
      </div>
      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <div className="gallery-card" key={index} onClick={() => handleGalleryClick(item.link)}>
            <div className="card-image-container">
              <img src={item.img} alt={item.title} className="gallery-image" />
              <div className="image-overlay" style={{ background: item.color }}></div>
            </div>
            <div className="card-content">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
              <button className="explore-btn">
                Explore Collection
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="section-header">
        <h2>Must-Have Accessories</h2>
        <p>Complete your look with these essentials</p>
      </div>
      <div className="accessories-section">
        <div className="accessories-grid">
          {accessories.map((item, i) => (
            <div className="accessory-card" key={i} onClick={() => handleAccessoryClick(item.link)}>
              <div className="accessory-image-container">
                <img src={item.img} alt={item.name} className="accessory-image" />
                <div className="category-tag">{item.category.toUpperCase()}</div>
                <button className="quick-view-btn">Quick View</button>
              </div>
              <div className="accessory-info">
                <h3>{item.name}</h3>
                <p className="price">{item.price}</p>
                <button className="add-to-cart-btn" onClick={(e) => {
                  e.stopPropagation();
                  addToCart({
                    name: item.name,
                    price: Number(item.price.replace(/[₹,]/g, '').trim()),
                    img: item.img,
                  });
                  alert('✅ Added to Cart!');
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
