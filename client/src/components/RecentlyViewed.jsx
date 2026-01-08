import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "../styles/ProductSection.css"; 

const RecentlyViewed = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchViewedProducts = async () => {
      const viewedIds = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
      
      if (viewedIds.length === 0) return;

      try {
        // Fetch products by IDs
        const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/products?ids=${viewedIds.join(",")}`
        );
        setProducts(data);
      } catch (error) {
        console.error("Error fetching recently viewed:", error);
      }
    };
    fetchViewedProducts();
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="product-section">
      <div className="section-header">
        <h2>Recently Viewed</h2>
      </div>
      <div className="section-body">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
