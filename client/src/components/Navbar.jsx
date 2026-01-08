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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { FaSearch, FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { IoChevronDown, IoEllipsisVertical } from "react-icons/io5";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* LEFT: Logo */}
        <div className="navbar-left">
          <Link to="/" className="logo-container">
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
              alt="Flipkart"
              className="logo"
            />
          </Link>
        </div>

        {/* CENTER: Search */}
        <form className="navbar-search" onSubmit={handleSearch}>
          <button type="submit" className="search-btn">
            <FaSearch className="search-icon" />
          </button>
          <input
            type="text"
            placeholder="Search for Products, Brands and More"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* RIGHT: Actions */}
        <div className="navbar-right">
          <div className="nav-item account-btn">
            <FaRegUserCircle className="nav-icon-main" />
            <span>Account</span>
            <IoChevronDown className="chevron" />
          </div>

          <Link to="/cart" className="nav-item cart-btn" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="cart-icon-wrapper">
              <FaShoppingCart className="nav-icon-main" />
              {/* <span className="cart-count">18</span> */} 
            </div>
            <span>Cart</span>
          </Link>

          <div className="nav-item seller-btn">
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/Header-None-Sellers-60589a.svg"
              alt="seller"
              className="seller-icon"
            />
            <span>Become a Seller</span>
          </div>

          <div className="nav-item more-btn">
            <IoEllipsisVertical className="more-icon" />
          </div>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
