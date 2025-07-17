import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { auth } from './firebase';

function Navbar({ username, setUsername }) {
  const { cartCount, setCartItems } = useCart();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.removeItem("userData");
    setUsername();
    setCartItems([]);
    alert("Logout successful!");
    navigate('/login');
  };

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
              <li className="nav-item">
                <NavLink className="nav-link modern-link" to="/">
                  <i className="fas fa-home me-1"></i> 
                  <span>Home</span>
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
              <li className="nav-item">
                <NavLink className="nav-link modern-link" to="/about">
                  <i className="fas fa-info-circle me-1"></i> 
                  <span>About</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link modern-link" to="/contact">
                  <i className="fas fa-envelope me-1"></i> 
                  <span>Contact</span>
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto align-items-center gap-2">
              {!username && (
                <>
                  <li className="nav-item">
                    <NavLink className="btn modern-btn login-btn" to="/login">
                      <i className="fas fa-sign-in-alt me-1"></i> 
                      <span>Login</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="btn modern-btn register-btn" to="/register">
                      <i className="fas fa-user-plus me-1"></i> 
                      <span>Register</span>
                    </NavLink>
                  </li>
                </>
              )}

              <li className="nav-item position-relative">
                <NavLink className="nav-link modern-link cart-link" to="/cart">
                  <i className="fas fa-shopping-cart me-1"></i> 
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="cart-badge">
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              </li>

              {username && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link modern-link profile-link" to="/profile">
                      <i className="fas fa-user-circle me-1"></i> 
                      <span>{username}</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link modern-link" to="/order">
                      <i className="fas fa-box-open me-1"></i> 
                      <span>Orders</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button className="btn modern-btn logout-btn" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-1"></i> 
                      <span>Logout</span>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .navbar {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          backdrop-filter: blur(10px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .navbar.scrolled {
          background: rgba(15, 15, 35, 0.95);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(15px);
        }

        .brand-hover {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .brand-hover:hover {
          transform: scale(1.05);
        }

        .brand-icon {
          animation: bounce 2s infinite;
        }

        .brand-text {
          background: linear-gradient(45deg, var(--primary), var(--secondary), var(--accent));
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientMove 3s ease infinite;
        }

        .modern-link {
          position: relative;
          padding: 8px 16px !important;
          border-radius: 20px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          color: var(--text-light) !important;
        }

        .modern-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .modern-link:hover::before {
          left: 100%;
        }

        .modern-link:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .modern-link i {
          transition: all 0.3s ease;
        }

        .modern-link:hover i {
          transform: scale(1.2) rotate(5deg);
        }

        .modern-btn {
          padding: 8px 20px !important;
          border-radius: 25px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          border: none;
          color: white;
        }

        .modern-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .modern-btn:hover::before {
          width: 300px;
          height: 300px;
        }

        .login-btn {
          background: linear-gradient(45deg, var(--primary), #4ecdc4);
        }

        .login-btn:hover {
          background: linear-gradient(45deg, #5b5fe0, #45b7d1);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
        }

        .register-btn {
          background: linear-gradient(45deg, var(--secondary), var(--accent));
        }

        .register-btn:hover {
          background: linear-gradient(45deg, #7c4dff, #e91e63);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
        }

        .logout-btn {
          background: linear-gradient(45deg, var(--accent), #ff6b6b);
        }

        .logout-btn:hover {
          background: linear-gradient(45deg, #d81b60, #ee5a52);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4);
        }

        .profile-link {
          color: var(--accent) !important;
          font-weight: bold;
        }

.cart-link {
  position: relative;
  display: inline-block;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(45deg, var(--accent), #ee5a52);
  color: white;
  border-radius: 50%;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  animation: pulse 2s infinite;
  box-shadow: 0 2px 10px rgba(236, 72, 153, 0.5);
  z-index: 9;
}


        .custom-toggler {
          border: none;
          padding: 4px 8px;
          transition: all 0.3s ease;
        }

        .custom-toggler:focus {
          box-shadow: none;
        }

        .custom-toggler:hover {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 5px;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 2px 10px rgba(236, 72, 153, 0.5);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 4px 20px rgba(236, 72, 153, 0.7);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 2px 10px rgba(236, 72, 153, 0.5);
          }
        }

        .nav-link.active {
          background: rgba(255, 255, 255, 0.2) !important;
          border-radius: 20px;
          transform: translateY(-2px);
        }

        @media (max-width: 991px) {
          .navbar-nav {
            gap: 0.5rem;
          }
          
          .modern-btn {
            margin: 0.25rem 0;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;