import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./styles/navbar.css";
import logo from "../../assets/images/logo/website-logo2.jpg";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext"; // 1. Import useAuth

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  // 2. Destructure auth states
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { cartItems } = useCart();
  const itemCount = cartItems.length;

  // 3. Handle Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="nav">
      <div className="navbar">
        {/* Upper Navbar */}
        <div className="upper-navbar">
          <div className="logo">
            <img className="website-logo" src={logo} alt="Logo" />
          </div>

          <div className="searchbar">
            <input type="text" placeholder="Search products..." />
            <button className="search-btn">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          <Link to="/cart" className="cart-link" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="cart">
              <div className="cart-icon-div">
                <i className="fa-solid fa-cart-shopping cart-icon"></i>
                {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
              </div>
              <div className="cart-text">
                <h3>My Cart</h3>
                <p>{itemCount} {itemCount === 1 ? 'Item' : 'Items'}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Lower Navbar */}
        <div className="lower-navbar">
          <div
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={`menu ${menuOpen ? "show" : ""}`}>
            <div
              className={`category ${categoryOpen ? "active" : ""}`}
              onClick={() => setCategoryOpen(!categoryOpen)}
            >
              <button className="category-btn">Categories ▾</button>
              <ul className="dropdown">
                <li><Link to="/products">All</Link></li>
                <li><Link to="/products?cat=fishmeal">Fishmeal</Link></li>
                <li><Link to="/products?cat=feed">Feed</Link></li>
              </ul>
            </div>

            <div className="pages">
              <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/products">Products</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
              </ul>
            </div>

            {/* --- DYNAMIC AUTH SECTION --- */}
            <div className="login-signup">
              {!isAuthenticated ? (
                <Link to="/login" className="login-signup-link">
                  <button className="login-signup-btn">
                    Login / Signup
                  </button>
                </Link>
              ) : (
                <div className="user-nav-box">
                  <span className="user-greeting">Hi, {user?.name?.split(" ")[0]}</span>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              )}
            </div>
            {/* ---------------------------- */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;