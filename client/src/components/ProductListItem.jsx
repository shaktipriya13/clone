import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart } from 'react-icons/fa';
import '../styles/ProductListItem.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductListItem = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistToggle = async (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    try {
        // Logic same as ProductCard
        // For brevity, just toggling state locally for UI feedback in this demo
        setIsWishlisted(!isWishlisted);
        toast.info(isWishlisted ? "Removed from Wishlist" : "Added to Wishlist", {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true
        });
    } catch (error) {
        console.error("Wishlist error", error);
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="product-list-item">
      <div className="list-item-image-container">
          <div className="wishlist-icon-list" onClick={handleWishlistToggle}>
             <FaHeart color={isWishlisted ? "#ff4343" : "#c2c2c2"} />
          </div>
          <img src={product.image || "https://via.placeholder.com/150"} alt={product.title} className="list-item-image" />
      </div>

      <div className="list-item-details">
          <div className="list-item-title">{product.title}</div>
          
          <div className="list-item-rating-row">
              <div className="list-item-rating">
                  {product.rating || 4.4} <FaStar size={10} style={{marginLeft:'2px'}}/>
              </div>
              <span className="list-item-reviews">1,234 Ratings & 100 Reviews</span>
          </div>

          <div className="list-item-specs">
              {/* Mock specs based on category */}
              <ul>
                  <li>{product.description}</li>
                  <li>1 Year Warranty</li>
                  <li>In Stock</li>
              </ul>
          </div>
      </div>

      <div className="list-item-price-col">
          <div className="list-item-price">₹{product.price.toLocaleString()}</div>
          <div className="list-item-original-price">₹{(product.price * 1.25).toFixed(0)}</div>
          <div className="list-item-discount">20% off</div>
          <div className="list-item-delivery">Free delivery</div>
          <div className="list-item-offer">Bank Offer</div>
      </div>
    </Link>
  );
};

export default ProductListItem;
