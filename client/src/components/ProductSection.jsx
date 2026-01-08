import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronRight } from "react-icons/fa";
import SimplifiedProductCard from "./SimplifiedProductCard";
import Loader from "./Loader";
import "../styles/ProductSection.css"; 

const ProductSection = ({ title, sectionTag, bgColor }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products?section=${sectionTag}`);
        setProducts(response.data);
      } catch (error) {
        console.error(`Error fetching ${title} products:`, error);
      } finally {
        setLoading(false);
      }
    };

    if (sectionTag) {
      fetchProducts();
    }
  }, [sectionTag, title]);

  if (loading) return <Loader />;
  if (products.length === 0) return null;

  return (
    <div className="product-section" style={{ backgroundColor: bgColor || "#fff" }}>
      <div className="section-header">
        <h2 style={{fontSize: '22px', fontWeight: '500'}}>{title}</h2>
        <button className="view-all-btn-circle">
         <FaChevronRight size={14} color="#fff" />

        </button>
      </div>
      <div className="section-body">
        {products.map((product, index) => {
            let tagline = null;
            if (sectionTag === 'best_quality') {
                const tags = ["New Collection", "Best Picks", "Big Savings", "Hand-picked", "Special offer", "Popular", "Most-loved"];
                tagline = tags[index % tags.length];
            } else if (sectionTag === 'summer_decor') {
                const tags = ["Special offer", "Min. 90% Off", "Special offer", "Min. 50% Off", "Top Sellers", "Min. 50% Off", "Min. 50% Off", "Best Deals"];
                tagline = tags[index % tags.length];
            }
          return <SimplifiedProductCard key={product.id} product={product} tagline={tagline} />;
        })}
      </div>
    </div>
  );
};

export default ProductSection;
