import React from "react";
import { Link } from "react-router-dom";
import "../styles/SimplifiedProductCard.css";

const SimplifiedProductCard = ({ product, tagline }) => {
  return (
    <Link to={`/product/${product.id}`} className="simplified-product-card">
      <div className="simplified-image-container">
        <img
          src={product.image || "https://via.placeholder.com/150"}
          alt={product.title}
          className="simplified-product-image"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "https://via.placeholder.com/150?text=No+Image";
          }}
        />
      </div>
      <div className="simplified-details">
        <div className="simplified-title">{product.title}</div>
        {tagline ? (
             <div className="simplified-price">{tagline}</div>
        ) : (
             <div className="simplified-price">From ₹{product.price.toLocaleString()}</div>
        )}
      </div>
    </Link>
  );
};

export default SimplifiedProductCard;
