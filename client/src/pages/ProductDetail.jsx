import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaBolt, FaHeart, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "../styles/ProductDetail.css";

const CustomToast = ({ message }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <FaCheckCircle color="#00ff00" size={20} />
    <span style={{ fontWeight: '500' }}>{message}</span>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        
        // Add to Recently Viewed logic
        const viewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
        if (!viewed.includes(parseInt(id))) {
            const newViewed = [parseInt(id), ...viewed].slice(0, 10);
            localStorage.setItem('recentlyViewed', JSON.stringify(newViewed));
        }

      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      await axios.post("http://localhost:5000/api/cart/add", {
        productId: product.id,
      });
       navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    }
  };

  const handleWishlistToggle = async () => {
    try {
        if (isWishlisted) {
            await axios.delete(`http://localhost:5000/api/wishlist/remove/${product.id}`);
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
            await axios.post(`http://localhost:5000/api/wishlist/add`, { productId: product.id });
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


  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-left">
        <div className="detail-image-box" style={{position:'relative'}}>
          <div className="wishlist-icon-pdp" onClick={handleWishlistToggle} style={{
              position: 'absolute', top: '20px', right: '20px', 
              background: 'white', borderRadius: '50%', width: '36px', height: '36px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)', cursor: 'pointer', border: '1px solid #e0e0e0', zIndex: 5
          }}>
             <FaHeart color={isWishlisted ? "#ff4343" : "#c2c2c2"} />
          </div>
          <img src={product.image || "https://via.placeholder.com/400"} alt={product.title} className="detail-image" />
        </div>
        <div className="detail-buttons">
            <button className="add-to-cart-btn" onClick={addToCart}>
               <FaShoppingCart style={{marginRight: '8px'}}/> ADD TO CART
            </button>
            <button className="buy-now-btn" onClick={() => window.location.href = '/checkout'} >
               <FaBolt style={{marginRight: '8px'}} /> BUY NOW
            </button>
        </div>
      </div>
      <div className="product-detail-right">
        <div className="detail-title">{product.title}</div>
        <div className="detail-rating-row">
             <div className="detail-rating">4.4 ★</div>
             <span className="detail-reviews">1,234 Ratings & 100 Reviews</span>
        </div>
        <div className="detail-price-row">
            <div className="detail-price">₹{product.price.toLocaleString()}</div>
            <div className="detail-original-price">₹{(product.price * 1.25).toFixed(0)}</div>
            <div className="detail-discount">20% off</div>
        </div>
        
        <div className="detail-description">
            <div className="desc-title">Product Description</div>
            <p>{product.description}</p>
        </div>

        <div className="detail-specs">
             <div className="desc-title">Specifications</div>
             <div className="spec-row">
                 <div className="spec-name">In The Box</div>
                 <div className="spec-value">Handset, Adapter, USB Cable, Sim Eject Tool</div>
             </div>
             <div className="spec-row">
                 <div className="spec-name">Model Number</div>
                 <div className="spec-value">{product.title.split(' ')[0]} 2024</div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
