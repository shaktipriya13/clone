import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaAngleDown,
  FaUser,
  FaHeart,
  FaBox,
  FaGift,
  FaTag,
  FaBell,
  FaSignOutAlt,
  FaStar,
  FaCoins,
} from "react-icons/fa";
import "../styles/Navbar.css";
import { useCart } from "../context/CartContext";

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState("");
  const { cartCount } = useCart();
//   const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <Link to="/" className="logo">
          <img
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png"
            alt="Flipkart"
            className="logo-img"
          />
          <div className="logo-sub">
            Explore <span className="plus-text">Plus</span>
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png"
              className="plus-icon"
              alt=""
            />
          </div>
        </Link>

        {/* SEARCH */}
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search for products, brands and more"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-icon-btn">
            <FaSearch />
          </button>
        </form>

        {/* NAV ITEMS */}
        <div className="nav-items">
          {/* ACCOUNT DROPDOWN */}
          <div className="account-dropdown">
            <div className="account-trigger">
              <span>My Account</span>
              <FaAngleDown className="arrow-icon" />
            </div>

            <div className="dropdown-menu">
              <div className="dropdown-arrow-up"></div>
              <Link to="/profile" className="dropdown-item">
                <FaUser className="dropdown-icon" /> My Profile
              </Link>
              <Link to="/supercoin" className="dropdown-item">
                <FaCoins className="dropdown-icon" /> SuperCoin Zone
              </Link>
              <Link to="/plus" className="dropdown-item">
                <FaStar className="dropdown-icon" /> Flipkart Plus Zone
              </Link>
              <Link to="/orders" className="dropdown-item">
                <FaBox className="dropdown-icon" /> Orders
              </Link>
              <Link to="/wishlist" className="dropdown-item">
                <FaHeart className="dropdown-icon" /> Wishlist
                
              </Link>
              <Link to="/coupons" className="dropdown-item">
                <FaTag className="dropdown-icon" /> Coupons
              </Link>
              <Link to="/giftcards" className="dropdown-item">
                <FaGift className="dropdown-icon" /> Gift Cards
              </Link>
              <Link to="/notifications" className="dropdown-item">
                <FaBell className="dropdown-icon" /> Notifications
              </Link>
              <div className="dropdown-item logout">
                <FaSignOutAlt className="dropdown-icon" /> Logout
              </div>
            </div>
          </div>

          <div className="nav-link">Become a Seller</div>
          <div className="nav-link">More <FaAngleDown className="arrow-icon-small" /></div>

          {/* CART */}
         {/* Find the CART section and replace with this cleaned version */}
<Link to="/cart" className="cart-link">
  <div className="cart-icon-container">
    <FaShoppingCart className="cart-icon-img" />
    {/* Always show the span so it displays '0' initially */}
    <span className="cart-count">{cartCount}</span>
  </div>
  <span className="cart-text">Cart</span>
</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;