import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/ProductSection.css"; // Reuse existing styles or add new ones

const FeaturedGrid = ({ title, sectionTag }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products?section=${sectionTag}`
        );
        // Take only first 4 for the 2x2 grid
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };
    fetchProducts();
  }, [sectionTag]);

  if (products.length === 0) return null;

  return (
    <div className="featured-grid-card">
      <div className="featured-header">
        <h3>{title}</h3>
        <button className="view-all-btn-circle">{">"}</button>
      </div>
      <div className="featured-grid-container">
        {products.map((product) => (
          <div key={product.id} className="featured-item">
             <Link to={`/product/${product.id}`} className="featured-link">
                <div className="featured-image-container">
                    <img src={product.image} alt={product.title} />
                </div>
                <div className="featured-title">{product.title}</div>
                <div className="featured-discount">Min. 50% Off</div>
             </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedGrid;
