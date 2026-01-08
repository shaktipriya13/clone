import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaBolt, FaHeart, FaStar, FaTag, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "../styles/ProductDetail.css";
import Loader from "../components/Loader";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const { refreshCart } = useCart();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
        setProduct(response.data);
        
        // Cart Check
        const cartResponse = await axios.get(import.meta.env.VITE_API_URL + '/api/cart/1');
        if (cartResponse.data?.CartItems) {
          setIsInCart(cartResponse.data.CartItems.some(item => item.ProductId === parseInt(id)));
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [id]);

  const addToCart = async () => {
    if (isInCart) { navigate("/cart"); return; }
    try {
      await axios.post(import.meta.env.VITE_API_URL + "/api/cart/add", { productId: product.id });
      await refreshCart();
      setIsInCart(true);
      toast.success("Added to cart!");
    } catch (error) { alert("Failed to add to cart"); }
  };

  if (loading) return <Loader />;
  if (!product) return <div>Product not found</div>;

  // Dummy gallery images to fill space
  const images = [product.image, product.image, product.image, product.image];

  return (
    <div className="pdp-container">
      <div className="pdp-wrapper">
        
        {/* LEFT COLUMN */}
        <div className="pdp-left-section">
          <div className="thumbnail-container">
            {images.map((img, i) => (
              <img key={i} src={img} className={`thumb-img ${i === 0 ? 'active' : ''}`} alt="thumb" />
            ))}
          </div>
          
          <div className="main-image-column">
            <div className="pdp-image-container">
              <div className="wishlist-icon-pdp" onClick={() => setIsWishlisted(!isWishlisted)}>
                <FaHeart color={isWishlisted ? "#ff4343" : "#c2c2c2"} />
              </div>
              <img src={product.image} alt={product.title} />
            </div>
            
            <div className="pdp-buttons">
              <button 
                className={`pdp-btn ${isInCart ? "add-to-cart-btn" : "add-to-cart-btn"}`} 
                onClick={addToCart}
                style={isInCart ? {backgroundColor: '#ff9f00'} : {}}
              >
                <FaShoppingCart style={{marginRight: '8px'}}/> {isInCart ? "GO TO CART" : "ADD TO CART"}
              </button>
              <button className="pdp-btn buy-now-btn" onClick={() => navigate('/checkout')}>
                <FaBolt style={{marginRight: '8px'}} /> BUY NOW
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="pdp-right-section">
          <div className="pdp-breadcrumb">
            Home {'>'} {product.category} {'>'} {product.title}
          </div>

          <h1 className="pdp-title">{product.title}</h1>
          
          <div className="pdp-rating-row">
            <div className="pdp-rating-badge">4.4 <FaStar size={10} /></div>
            <span className="pdp-reviews">9,411 Ratings & 1,037 Reviews</span>
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Assured" style={{height: '21px'}}/>
          </div>

          <div className="pdp-price-row">
            <div className="pdp-price">₹{product.price.toLocaleString()}</div>
            <div className="pdp-original-price">₹{(product.price * 1.2).toFixed(0)}</div>
            <div className="pdp-discount">20% off</div>
          </div>

          <div className="pdp-offers-section">
            <div className="pdp-section-title">Available offers</div>
            <div className="pdp-offer-item">
              <FaTag color="#388e3c" size={14} style={{marginTop: '3px'}} />
              <span><strong>Bank Offer</strong> 5% Cashback on Flipkart Axis Bank Card <span className="pdp-link">T&C</span></span>
            </div>
            <div className="pdp-offer-item">
              <FaTag color="#388e3c" size={14} style={{marginTop: '3px'}} />
              <span><strong>Special Price</strong> Get extra ₹1000 off (price inclusive of cashback/coupon) <span className="pdp-link">T&C</span></span>
            </div>
            <div className="pdp-offer-item">
              <FaTag color="#388e3c" size={14} style={{marginTop: '3px'}} />
              <span><strong>Partner Offer</strong> Sign up for Flipkart Pay Later and get Flipkart Gift Card worth up to ₹500 <span className="pdp-link">Know More</span></span>
            </div>
          </div>

          <div className="seller-row">
            <div className="seller-label">Seller</div>
            <div>
              <span className="seller-name">RetailNet</span>
              <div style={{fontSize: '12px', color: '#878787', marginTop: '8px'}}>
                • 7 Days Service Center Replacement/Repair<br/>
                • GST invoice available
              </div>
            </div>
          </div>

          <div style={{marginTop: '40px', border: '1px solid #f0f0f0', padding: '24px'}}>
             <div className="pdp-section-title">Product Description</div>
             <p style={{fontSize: '14px', lineHeight: '1.5'}}>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;