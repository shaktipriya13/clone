import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaChevronRight, FaHeart, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "./Loader";
import "../styles/ProductSection.css";
import "../styles/ProductCard.css"; 
 
const CustomToast = ({ message }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <FaCheckCircle color="#00ff00" size={20} />
    <span style={{ fontWeight: '500' }}>{message}</span>
  </div>
);

const FeaturedProductItem = ({ product }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleWishlistToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const token = localStorage.getItem("token");
        if (!token) {
            toast.info("Please login to wishlist items");
            return;
        }
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            if (isWishlisted) {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/wishlist/remove/${product.id}`, config);
                setIsWishlisted(false);
                toast(<CustomToast message="Removed from your Wishlist" />, {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    style: { background: '#333', color: '#fff' }
                });
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/api/wishlist/add`, { productId: product.id }, config);
                setIsWishlisted(true);
                toast(<CustomToast message="Added to your Wishlist" />, {
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
        <div className="featured-item">
            <Link to={`/product/${product.id}`} className="featured-link">
                <div className="featured-image-container" style={{ position: 'relative' }}>
                    <div className="wishlist-icon" onClick={handleWishlistToggle} style={{ position: 'absolute', top: '5px', right: '5px', zIndex: 10 }}>
                        <FaHeart color={isWishlisted ? "#ff4343" : "#c2c2c2"} />
                    </div>
                    <img
                        src={product.image}
                        alt={product.title}
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150?text=No+Image"; }}
                    />
                </div>
                <div className="featured-title">{product.title}</div>
                <div className="featured-discount">Min. 50% Off</div>
            </Link>
        </div>
    );
};

const FeaturedGrid = ({ title, sectionTag }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products?section=${sectionTag}`
        );
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [sectionTag]);

  if (loading) return <Loader />;
  if (products.length === 0) return null;

  return (
    <div className="featured-grid-card">
      <div className="featured-header">
        <h3 style={{ fontSize: '20px', fontWeight: '500', color: '#000' }}>{title}</h3>
        <button className="view-all-btn-circle">
             <FaChevronRight size={14} color="#ffffff" />
        </button>
      </div>
      <div className="featured-grid-container">
        {products.map((product) => (
            <FeaturedProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedGrid;
