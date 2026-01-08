// import "../styles/Navbar.css";
// import {
//   FaBars,
//   FaSearch,
//   FaUser,
//   FaShoppingCart,
//   FaEllipsisV,
// } from "react-icons/fa";

// const Navbar = () => {
//   return (
//     <>
//       {/* NAVBAR */}
//       <nav className="navbar">
//         {/* LEFT */}
//         <div className="navbar-left">
//           {/* Hamburger (MOBILE ONLY) */}
//           <FaBars className="hamburger" />

//           <div className="logo-box">
//             <img src="/logo.svg" alt="Flipkart" className="logo" />
//           </div>
//         </div>

//         {/* SEARCH (DESKTOP ONLY) */}
//         <div className="navbar-search desktop-only">
//           <FaSearch className="search-icon" />
//           <input
//             type="text"
//             placeholder="Search for Products, Brands and More"
//           />
//         </div>

//         {/* RIGHT */}
//         <div className="navbar-right">
//           <div className="nav-item desktop-only">
//             <FaUser />
//             <span>Account</span>
//           </div>

//           <div className="nav-item cart">
//             <FaShoppingCart />
//             <span className="desktop-only">Cart</span>
//             <span className="cart-count">18</span>
//           </div>

//           <div className="nav-item desktop-only">Become a Seller</div>

//           <FaEllipsisV className="more-icon" />
//         </div>
//       </nav>

//       {/* SEARCH (MOBILE ONLY) */}
//       <div className="mobile-search mobile-only">
//         <FaSearch />
//         <input type="text" placeholder="Search for Products, Brands and More" />
//       </div>
//     </>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser, FaHeart, FaBox, FaGift, FaTag, FaBell, FaSignOutAlt, FaStar, FaCoins } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState("");
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
                <Link to="/" className="logo">
                     <img 
                        src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png" 
                        alt="Flipkart" 
                        className="logo-img"
                    />
                    <div className="logo-sub">
                        Explore <span style={{color:'#ffe500', fontWeight:'bold', margin:'0 2px'}}>Plus</span>
                        <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png" className="plus-icon" alt=""/>
                    </div>
                </Link>

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

                <div className="nav-items">
                    {/* Account Dropdown */}
                    <div className="account-dropdown">
                        <span style={{color: 'white', fontWeight: '500'}}>My Account</span>
                         {/* Dropdown Menu */}
                         <div className="dropdown-menu">
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
                                <span style={{marginLeft: 'auto', background:'#f0f0f0', padding:'2px 6px', fontSize:'11px', borderRadius:'2px'}}>31</span> {/* Mock count */}
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
                             <div className="dropdown-item">
                                <FaSignOutAlt className="dropdown-icon" /> Logout
                            </div>
                         </div>
                    </div>

                    <div style={{color: 'white', fontWeight: '500', cursor:'pointer'}}>Become a Seller</div>

                    <div style={{color: 'white', fontWeight: '500', cursor:'pointer'}}>More</div>
                    
                    <Link to="/cart" className="cart-link">
                         <FaShoppingCart style={{fontSize: '20px'}}/>
                         <span>Cart</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
```
