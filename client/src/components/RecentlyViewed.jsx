import React, { useEffect, useState } from "react";
import axios from "axios";
import SimplifiedProductCard from "./SimplifiedProductCard";
import Loader from "./Loader";
import "../styles/ProductSection.css"; 

const RecentlyViewed = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchViewedProducts = async () => {
      const viewedIds = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
      
      if (viewedIds.length === 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Fetch products by IDs
        const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/products?ids=${viewedIds.join(",")}`
        );
        setProducts(data);
      } catch (error) {
        console.error("Error fetching recently viewed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchViewedProducts();
  }, []);

  if (loading) return <Loader />;
  if (products.length === 0) return null;

  return (
    <div className="product-section">
      <div className="section-header">
        <h2 style={{fontSize: '22px', fontWeight: '500'}}>Recently Viewed</h2>
      </div>
      <div className="section-body">
        {products.map((product) => (
          <SimplifiedProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
