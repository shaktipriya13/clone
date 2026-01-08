import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronRight } from "react-icons/fa";
import ProductCard from "./ProductCard";
import "../styles/ProductSection.css"; // Ensure you create this CSS file

const ProductSection = ({ title, sectionTag, bgColor }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products?section=${sectionTag}`);
        setProducts(response.data);
      } catch (error) {
        console.error(`Error fetching ${title} products:`, error);
      }
    };

    if (sectionTag) {
      fetchProducts();
    }
  }, [sectionTag, title]);

  if (products.length === 0) return null;

  return (
    <div className="product-section" style={{ backgroundColor: bgColor || "#fff" }}>
      <div className="section-header">
        <h2>{title}</h2>
        <button className="view-all-btn-circle">
         <FaChevronRight size={14} color="#fff" />

        </button>
      </div>
      <div className="section-body">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
