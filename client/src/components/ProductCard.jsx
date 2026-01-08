import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "../styles/ProductCard.css"; 

const CustomToast = ({ message }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <FaCheckCircle color="#00ff00" size={20} />
    <span style={{ fontWeight: '500' }}>{message}</span>
  </div>
);

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistToggle = async (e) => {
    e.preventDefault(); 
    e.stopPropagation();

    try {
        if (isWishlisted) {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/wishlist/remove/${product.id}`);
            setIsWishlisted(false);
             toast( <CustomToast message="Removed from your Wishlist" />, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: { background: '#333', color: '#fff' }
            });
        } else {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/wishlist/add`, { productId: product.id });
            setIsWishlisted(true);
            toast( <CustomToast message="Added to your Wishlist" />, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: { background: '#333', color: '#fff' }
            });
        }
    } catch (error) {
        console.error("Wishlist toggle error", error);
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-container">
        <div className="wishlist-icon" onClick={(e) => handleWishlistToggle(e)}>
             <FaHeart color={isWishlisted ? "#ff4343" : "#c2c2c2"} />
        </div>
        <img
          src={product.image || "https://via.placeholder.com/150"}
          alt={product.title}
          className="product-image"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "https://via.placeholder.com/150?text=No+Image";
          }}
        />
      </div>
      <div className="product-details">
        <div className="product-title">{product.title}</div>
        <div className="product-rating-container">
            <div className="product-rating">
                4.4 <span className="star">★</span>
            </div>
            <span className="rating-count">(1,234)</span> 
        </div>
        <div className="product-price-container">
          <div className="product-price">₹{product.price.toLocaleString()}</div>
          <div className="product-original-price">
            ₹{(product.price * 1.2).toFixed(0)}
          </div>
          <div className="product-discount">20% off</div>
        </div>
        {product.stock < 5 && (
             <div className="product-stock-warning">Only {product.stock} left!</div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
