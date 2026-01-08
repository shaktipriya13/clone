import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css"; // Ensure you create this CSS file

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-container">
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
