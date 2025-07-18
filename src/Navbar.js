import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { auth } from './firebase';

function Navbar() {
  const { cartCount, setCartItems } = useCart();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) setUserData(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.removeItem("userData");
    setUserData(null);
    setCartItems([]);
    alert("Logout successful!");
    navigate('/login');
  };

  const username = userData?.username;
  const isAdmin = userData?.role === "admin";

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-dark sticky-top py-2 ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-4 d-flex align-items-center brand-hover" to="/">
            <i className="fas fa-shopping-bag me-2 brand-icon"></i>
            <span className="brand-text">MYSHOP</span>
          </NavLink>

          <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              {isAdmin ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link modern-link" to="/admin/dashboard">
                      <i className="fas fa-tools me-1"></i>
                      <span>Dashboard</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link modern-link" to="/men">
                      <i className="fas fa-male me-1"></i>
                      <span>Men</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link modern-link" to="/women">
                      <i className="fas fa-female me-1"></i>
                      <span>Women</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link modern-link" to="/kids">
                      <i className="fas fa-child me-1"></i>
                      <span>Kids</span>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link modern-link" to="/">
                      <i className="fas fa-home me-1"></i> <span>Home</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link modern-link" to="/men">
                      <i className="fas fa-male me-1"></i> <span>Men</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link modern-link" to="/women">
                      <i className="fas fa-female me-1"></i> <span>Women</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link modern-link" to="/kids">
                      <i className="fas fa-child me-1"></i> <span>Kids</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link modern-link" to="/about">
                      <i className="fas fa-info-circle me-1"></i> <span>About</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link modern-link" to="/contact">
                      <i className="fas fa-envelope me-1"></i> <span>Contact</span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            <ul className="navbar-nav ms-auto align-items-center gap-2">
              {!username && (
                <>
                  <li className="nav-item">
                    <NavLink className="btn modern-btn login-btn" to="/login">
                      <i className="fas fa-sign-in-alt me-1"></i> <span>Login</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="btn modern-btn register-btn" to="/register">
                      <i className="fas fa-user-plus me-1"></i> <span>Register</span>
                    </NavLink>
                  </li>
                </>
              )}

              {!isAdmin && username && (
                <>
                  <li className="nav-item position-relative">
                    <NavLink className="nav-link modern-link cart-link" to="/cart">
                      <i className="fas fa-shopping-cart me-1"></i> <span>Cart</span>
                      {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link modern-link profile-link" to="/profile">
                      <i className="fas fa-user-circle me-1"></i> <span>{username}</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link modern-link" to="/order">
                      <i className="fas fa-box-open me-1"></i> <span>Orders</span>
                    </NavLink>
                  </li>
                </>
              )}

              {username && (
                <li className="nav-item">
                  <button className="btn modern-btn logout-btn" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt me-1"></i> <span>Logout</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* ✅ Styling */}
      <style jsx>{`
        .navbar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease-in-out;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 10px;
          padding-bottom: 10px;
        }
        .navbar.scrolled {
          background: rgba(40, 40, 50, 0.95);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        .navbar-brand {
          font-size: 1.8rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .brand-icon { font-size: 1.6rem; animation: bounce 2s infinite; }
        .brand-text {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientMove 3s infinite;
          font-weight: bold;
          letter-spacing: 1px;
        }
        .navbar-nav { gap: 0.75rem; }
        .modern-link {
          position: relative;
          padding: 8px 16px !important;
          border-radius: 20px;
          transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .modern-link::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: transform 0.6s ease;
          pointer-events: none;
        }
        .modern-link:hover::before { left: 0; transform: translateX(100%); }
        .modern-link:hover {
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transform: translateY(-1px);
        }
        .modern-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 30px;
          font-size: 0.95rem;
          font-weight: 600;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .modern-btn::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          width: 0; height: 0;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
          z-index: 0;
        }
        .modern-btn:hover::before { width: 300px; height: 300px; }
        .modern-btn span { position: relative; z-index: 1; }
        .login-btn { background: linear-gradient(45deg, #28a745, #20c997); color: white; }
        .register-btn { background: linear-gradient(45deg, #007bff, #6f42c1); color: white; }
        .logout-btn { background: linear-gradient(45deg, #dc3545, #e74c3c); color: white; }
        .profile-link { font-weight: bold; color: #28a745 !important; }
        .cart-link {
          position: relative; display: flex; align-items: center; gap: 6px;
          padding: 8px 20px 8px 16px !important; border-radius: 20px; color: #fff !important;
          transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .cart-link:hover { background: rgba(255, 255, 255, 0.12); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); transform: translateY(-1px); }
        .cart-badge {
          position: absolute; top: 4px; right: 4px; bottom: 8px;
          background: linear-gradient(135deg, #ff6b6b, #e74c3c); color: white;
          font-size: 11px; font-weight: bold; border-radius: 50%; width: 15px; height: 15px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 6px rgba(231, 76, 60, 0.4); animation: pulse 1.5s infinite; z-index: 2;
        }
        .nav-link.active { background: rgba(255, 255, 255, 0.2) !important; transform: translateY(-1px); border-radius: 20px; }
        @media (max-width: 991px) {
          .navbar-nav { gap: 0.5rem; padding-top: 10px; }
          .modern-btn { margin-bottom: 8px; width: 100%; justify-content: center; }
          .nav-item { width: 100%; }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 2px 8px rgba(255, 107, 107, 0.4); }
          50% { transform: scale(1.1); box-shadow: 0 4px 16px rgba(255, 107, 107, 0.7); }
          100% { transform: scale(1); box-shadow: 0 2px 8px rgba(255, 107, 107, 0.4); }
        }
      `}</style>
    </>
  );
}

export default Navbar;
