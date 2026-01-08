import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaBolt, FaHeart, FaCheckCircle, FaStar, FaTag, FaMapMarkerAlt, FaShieldAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "../styles/ProductDetail.css";
import Loader from "../components/Loader";
import { useCart } from "../context/CartContext";

const CustomToast = ({ message }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <FaCheckCircle color="#00ff00" size={20} />
    <span style={{ fontWeight: '500' }}>{message}</span>
  </div>
);

// Dummy Data Helper Functions
const getDummyOffers = () => [
    { type: 'Bank Offer', text: '5% Unlimited Cashback on Flipkart Axis Bank Credit Card', link: 'T&C' },
    { type: 'Bank Offer', text: '10% Off on Bank of Baroda Mastercard debit card first time transaction, Terms and Condition apply', link: 'T&C' },
    { type: 'Partner Offer', text: 'Purchase now & get a surprise cashback coupon for January / February 2023', link: 'Know More' },
    { type: 'Special Price', text: 'Get extra 20% off (price inclusive of cashback/coupon)', link: 'T&C' }
];

const getDummySpecs = (category, title) => {
    // Default specs
    let specs = {
        "General": [
            { label: "In The Box", value: "Handset, Adapter, USB Cable, Sim Eject Tool, Manual" },
            { label: "Model Number", value: `${title?.split(' ')[0] || 'Generic'} 2024` },
            { label: "Color", value: "Midnight Black" },
            { label: "Browse Type", value: "Smartphones" },
            { label: "SIM Type", value: "Dual Sim" },
        ],
        "Display Features": [
            { label: "Display Size", value: "16.94 cm (6.67 inch)" },
            { label: "Resolution", value: "2400 x 1080 Pixels" },
            { label: "Resolution Type", value: "Full HD+" },
            { label: "GPU", value: "Adreno 610" },
        ],
        "Os & Processor Features": [
            { label: "Operating System", value: "Android 13" },
            { label: "Processor Type", value: "Qualcomm Snapdragon 685" },
            { label: "Processor Core", value: "Octa Core" },
        ],
        "Memory & Storage Features": [
            { label: "Internal Storage", value: "128 GB" },
            { label: "RAM", value: "8 GB" },
            { label: "Expandable Storage", value: "Yes" },
        ]
    };

    if (category === 'Laptops') {
         specs = {
            "General": [
                { label: "Sales Package", value: "Laptop, Power Adaptor, User Guide, Warranty Documents" },
                { label: "Model Number", value: `${title?.split(' ')[0] || 'Generic'} 2024` },
                { label: "Part Number", value: "MacBook Air" },
                { label: "Series", value: "Air" },
                { label: "Color", value: "Space Grey" },
                { label: "Type", value: "Thin and Light Laptop" },
                { label: "Suitable For", value: "Processing & Multitasking" },
            ],
            "Processor And Memory Features": [
                { label: "Processor Brand", value: "Apple" },
                { label: "Processor Name", value: "M2" },
                { label: "SSD", value: "Yes" },
                { label: "SSD Capacity", value: "256 GB" },
                { label: "RAM", value: "8 GB" },
                { label: "RAM Type", value: "Unified Memory" },
            ],
            "Display And Audio Features": [
                { label: "Touchscreen", value: "No" },
                { label: "Screen Size", value: "34.54 cm (13.6 Inch)" },
                { label: "Screen Resolution", value: "2560 x 1664 Pixel" },
                { label: "Screen Type", value: "Liquid Retina Display" },
            ],
             "Connectivity Features": [
                { label: "Wireless LAN", value: "Wi-Fi 6 (802.11ax)" },
                { label: "Bluetooth", value: "v5.0" },
            ]
        };
    } else if (category === 'Clothing') {
        specs = {
             "Product Details": [
                 { label: "Type", value: "Round Neck" },
                 { label: "Sleeve", value: "Half Sleeve" },
                 { label: "Fit", value: "Regular" },
                 { label: "Fabric", value: "Pure Cotton" },
                 { label: "Sales Package", value: "1 T-Shirt" },
                 { label: "Pack of", value: "1" },
                 { label: "Style Code", value: "TS-101-BLK" },
                 { label: "Neck Type", value: "Round Neck" },
             ]
        }
    }

    return specs;
};

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
        
        const viewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
        if (!viewed.includes(parseInt(id))) {
            const newViewed = [parseInt(id), ...viewed].slice(0, 10);
            localStorage.setItem('recentlyViewed', JSON.stringify(newViewed));
        }

        const cartResponse = await axios.get(import.meta.env.VITE_API_URL + '/api/cart/1'); // Hardcoded userId: 1
        if (cartResponse.data && cartResponse.data.CartItems) {
          const exists = cartResponse.data.CartItems.some(item => item.ProductId === parseInt(id));
          setIsInCart(exists);
        }

      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [id]);

  const addToCart = async () => {
    if (isInCart) {
      navigate("/cart");
      return;
    }

    try {
      await axios.post(import.meta.env.VITE_API_URL + "/api/cart/add", {
        productId: product.id,
      });
      
      await refreshCart();
      setIsInCart(true); 
      
      toast(<CustomToast message="Item added to cart" />, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: { background: '#333', color: '#fff' }
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    }
  };

  const handleWishlistToggle = async () => {
    try {
        if (isWishlisted) {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/wishlist/remove/${product.id}`);
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
            await axios.post(`${import.meta.env.VITE_API_URL}/api/wishlist/add`, { productId: product.id });
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

  if (loading) return <Loader />;
  if (!product) return <div>Product not found</div>;

  const specs = getDummySpecs(product.category, product.title);
  const offers = getDummyOffers();

  return (
    <div className="pdp-container">
      <div className="pdp-wrapper">
        <div className="pdp-image-section">
          <div className="pdp-image-container" style={{position:'relative'}}>
            <div className="wishlist-icon-pdp" onClick={handleWishlistToggle} style={{
                position: 'absolute', top: '10px', right: '10px', 
                background: 'white', borderRadius: '50%', width: '36px', height: '36px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)', cursor: 'pointer', border: '1px solid #e0e0e0', zIndex: 5
            }}>
               <FaHeart color={isWishlisted ? "#ff4343" : "#c2c2c2"} />
            </div>
            <img src={product.image || "https://via.placeholder.com/400"} alt={product.title} />
          </div>
          <div className="pdp-buttons">
              <button 
                className={`pdp-btn ${isInCart ? "go-to-cart-btn" : "add-to-cart-btn"}`} 
                onClick={addToCart}
                style={isInCart ? { backgroundColor: '#757575', color: '#fff', border: '1px solid #616161' } : {}}
              >
                 <FaShoppingCart style={{marginRight: '8px'}}/> {isInCart ? "GO TO CART" : "ADD TO CART"}
              </button>
              <button className="pdp-btn buy-now-btn" onClick={() => navigate('/checkout')} >
                 <FaBolt style={{marginRight: '8px'}} /> BUY NOW
              </button>
          </div>
        </div>
        
        <div className="pdp-details-section">
          {/* Breadcrumb - dummy */}
          <div className="pdp-breadcrumb">
              Home {'>'} {product.category} {'>'} {product.title}
          </div>

          <h1 className="pdp-title">{product.title}</h1>
          
          <div className="pdp-rating-row">
               <div className="pdp-rating">4.4 <FaStar size={10} style={{marginLeft:'2px'}}/></div>
               <span className="pdp-reviews">1,234 Ratings & 100 Reviews</span>
               <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Assured" style={{height: '21px', marginLeft: '12px'}}/>
          </div>
          
          <div className="pdp-price-row">
              <div className="pdp-price">₹{product.price.toLocaleString()}</div>
              <div className="pdp-original-price">₹{(product.price * 1.25).toFixed(0)}</div>
              <div className="pdp-discount">20% off</div>
          </div>

          <div className="pdp-offers-section">
              <div className="pdp-section-title">Available offers</div>
              <div className="pdp-offers-list">
                  {offers.map((offer, index) => (
                       <div key={index} className="pdp-offer-item">
                       <FaTag color="#388e3c" size={14} style={{marginTop: '3px', flexShrink: 0}} />
                       <span><strong>{offer.type}</strong> {offer.text} <span className="pdp-link">{offer.link}</span></span>
                   </div>
                  ))}
              </div>
          </div>

          {/* Sold By Section (Dummy) */}
           <div className="pdp-seller-section">
                <div style={{display:'flex', gap: '40px'}}>
                     <div style={{display:'flex', gap:'8px', color: '#878787', fontSize: '14px'}}>
                         <div style={{width: '100px'}}>Seller</div>
                         <div>
                             <div style={{color: '#2874f0', fontWeight: '500', display:'flex', alignItems:'center', gap:'5px'}}>
                                 RetailNet <span style={{background: '#2874f0', color: 'white', borderRadius: '10px', padding: '2px 8px', fontSize: '10px'}}>5.0 <FaStar size={8}/></span>
                             </div>
                             <ul style={{marginTop: '8px', paddingLeft: '20px'}}>
                                 <li>7 Days Service Center Replacement/Repair</li>
                                 <li>GST invoice available</li>
                             </ul>
                         </div>
                     </div>
                </div>
           </div>
          
          <div className="pdp-description">
              <div className="pdp-section-title">Product Description</div>
              <p className="pdp-description-text">{product.description}</p>
          </div>

          <div className="pdp-specifications">
               <div className="pdp-section-title">Specifications</div>
               <div className="spec-table-container">
                   {Object.entries(specs).map(([category, items]) => (
                       <div key={category} className="spec-group">
                           <div className="spec-group-title">{category}</div>
                           {items.map((item, idx) => (
                               <div key={idx} className="spec-row">
                                   <div className="spec-label">{item.label}</div>
                                   <div className="spec-value">{item.value}</div>
                               </div>
                           ))}
                       </div>
                   ))}
               </div>
          </div>

           {/* Ratings & Reviews (Dummy) */}
           <div className="pdp-ratings-reviews">
               <div className="pdp-section-title" style={{display:'flex', justifyContent:'space-between'}}>
                   Ratings & Reviews
                   <button className="rate-product-btn">Rate Product</button>
               </div>
               <div className="rating-summary">
                   <div className="rating-big-box">
                       <div className="rating-big">4.4 <FaStar size={16}/></div>
                       <div className="rating-count">1,234 Ratings &<br/>100 Reviews</div>
                   </div>
                   <div className="rating-bars">
                       {[5,4,3,2,1].map(star => (
                           <div key={star} className="rating-bar-row">
                               <span className="star-label">{star} <FaStar size={10}/></span>
                               <div className="progress-bg"><div className="progress-fill" style={{width: `${Math.random() * 80 + 10}%`, background: star >= 3 ? '#388e3c' : (star === 2 ? '#ff9f00' : '#ff4343')}}></div></div>
                               <span className="rating-num">{Math.floor(Math.random() * 500)}</span>
                           </div>
                       ))}
                   </div>
               </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;