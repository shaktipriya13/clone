// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaShoppingCart, FaBolt, FaHeart, FaCheckCircle, FaStar, FaTag } from "react-icons/fa";
// import { toast } from "react-toastify";
// import "../styles/ProductDetail.css";
// import { useCart } from "../context/CartContext";

// const CustomToast = ({ message }) => (
//   <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//     <FaCheckCircle color="#00ff00" size={20} />
//     <span style={{ fontWeight: '500' }}>{message}</span>
//   </div>
// );


// const ProductDetail = () => {
    
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const { refreshCart } = useCart();
  

//   useEffect(() => {
//     // ... useEffect content remains same, just ensuring hook order ...
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/products/${id}`);
//         setProduct(response.data);
        
//         // Add to Recently Viewed logic
//         const viewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
//         if (!viewed.includes(parseInt(id))) {
//             const newViewed = [parseInt(id), ...viewed].slice(0, 10);
//             localStorage.setItem('recentlyViewed', JSON.stringify(newViewed));
//         }

//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   const addToCart = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/cart/add", {
//         productId: product.id,
//       });
//        await refreshCart();
//        toast( <CustomToast message="Item added to cart" />, {
//           position: "bottom-center",
//           autoClose: 2000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           style: { background: '#333', color: '#fff' }
//       });
//     //   await refreshCart();
//     //    navigate("/cart");
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       alert("Failed to add to cart");
//     }
//   };

//   const handleWishlistToggle = async () => {
//     try {
//         if (isWishlisted) {
//             await axios.delete(`http://localhost:5000/api/wishlist/remove/${product.id}`);
//             setIsWishlisted(false);
//              toast( <CustomToast message="Removed from your Wishlist" />, {
//                 position: "bottom-center",
//                 autoClose: 2000,
//                 hideProgressBar: true,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 style: { background: '#333', color: '#fff' }
//             });
//         } else {
//             await axios.post(`http://localhost:5000/api/wishlist/add`, { productId: product.id });
//             setIsWishlisted(true);
//             toast( <CustomToast message="Added to your Wishlist" />, {
//                 position: "bottom-center",
//                 autoClose: 2000,
//                 hideProgressBar: true,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 style: { background: '#333', color: '#fff' }
//             });
//         }
//     } catch (error) {
//         console.error("Wishlist toggle error", error);
//     }
//   };


//   if (loading) return <div>Loading...</div>;
//   if (!product) return <div>Product not found</div>;

//   return (
//     <div className="pdp-container">
//       <div className="pdp-wrapper">
//         <div className="pdp-image-section">
//           <div className="pdp-image-container" style={{position:'relative'}}>
//             <div className="wishlist-icon-pdp" onClick={handleWishlistToggle} style={{
//                 position: 'absolute', top: '10px', right: '10px', 
//                 background: 'white', borderRadius: '50%', width: '36px', height: '36px',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 boxShadow: '0 1px 4px rgba(0,0,0,0.1)', cursor: 'pointer', border: '1px solid #e0e0e0', zIndex: 5
//             }}>
            
//                <FaHeart color={isWishlisted ? "#ff4343" : "#c2c2c2"} />
//             </div>
//             <img src={product.image || "https://via.placeholder.com/400"} alt={product.title} />
//           </div>
//           <div className="pdp-buttons">
//               <button className="pdp-btn add-to-cart-btn" onClick={addToCart}>
//                  <FaShoppingCart style={{marginRight: '8px'}}/> ADD TO CART
//               </button>
//               <button className="pdp-btn buy-now-btn" onClick={() => window.location.href = '/checkout'} >
//                  <FaBolt style={{marginRight: '8px'}} /> BUY NOW
//               </button>
//           </div>
//         </div>
        
//         <div className="pdp-details-section">
//           <h1 className="pdp-title">{product.title}</h1>
          
//           <div className="pdp-rating-row">
//                <div className="pdp-rating">4.4 <FaStar size={10} style={{marginLeft:'2px'}}/></div>
//                <span className="pdp-reviews">1,234 Ratings & 100 Reviews</span>
//                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Assured" style={{height: '21px', marginLeft: '12px'}}/>
//           </div>
          
//           <div className="pdp-price-row">
//               <div className="pdp-price">₹{product.price.toLocaleString()}</div>
//               <div className="pdp-original-price">₹{(product.price * 1.25).toFixed(0)}</div>
//               <div className="pdp-discount">20% off</div>
//           </div>

//           <div className="pdp-offers-section" style={{marginBottom: '24px'}}>
//               <div style={{fontSize: '16px', fontWeight: '500', marginBottom: '10px'}}>Available offers</div>
//               <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
//                   <div style={{display:'flex', alignItems:'center', fontSize:'14px'}}>
//                       <FaTag color="#388e3c" style={{marginRight:'10px'}} />
//                       <span><strong>Bank Offer</strong> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card <span style={{color:'#2874f0', cursor:'pointer'}}>T&C</span></span>
//                   </div>
//                   <div style={{display:'flex', alignItems:'center', fontSize:'14px'}}>
//                       <FaTag color="#388e3c" style={{marginRight:'10px'}} />
//                       <span><strong>Bank Offer</strong> 10% Off on Bank of Baroda Mastercard debit card first time transaction, Terms and Condition apply <span style={{color:'#2874f0', cursor:'pointer'}}>T&C</span></span>
//                   </div>
//                   <div style={{display:'flex', alignItems:'center', fontSize:'14px'}}>
//                       <FaTag color="#388e3c" style={{marginRight:'10px'}} />
//                       <span><strong>Partner Offer</strong> Purchase now & get a surprise cashback coupon for January / February 2023 <span style={{color:'#2874f0', cursor:'pointer'}}>Know More</span></span>
//                   </div>
//               </div>
//           </div>
          
//           <div className="pdp-description">
//               <h3>Product Description</h3>
//               <p style={{fontSize:'14px', lineHeight:'1.5', color:'#212121'}}>{product.description}</p>
//           </div>

//           <div className="pdp-specifications">
//                <h3>Specifications</h3>
//                <div className="spec-table">
//                    <div className="spec-row">
//                        <div className="spec-label">In The Box</div>
//                        <div className="spec-value">Handset, Adapter, USB Cable, Sim Eject Tool</div>
//                    </div>
//                    <div className="spec-row">
//                        <div className="spec-label">Model Number</div>
//                        <div className="spec-value">{product.title.split(' ')[0]} 2024</div>
//                    </div>
//                    <div className="spec-row">
//                        <div className="spec-label">Category</div>
//                        <div className="spec-value">{product.category}</div>
//                    </div>
//                    <div className="spec-row">
//                        <div className="spec-label">Warranty</div>
//                        <div className="spec-value">1 Year Manufacturer Warranty</div>
//                    </div>
//                </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaBolt, FaHeart, FaCheckCircle, FaStar, FaTag } from "react-icons/fa";
import { toast } from "react-toastify";
import "../styles/ProductDetail.css";
import { useCart } from "../context/CartContext";

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
  const [isInCart, setIsInCart] = useState(false); // State to track if item is in cart
  const { refreshCart } = useCart();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Fetch Product Details
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        
        // Add to Recently Viewed logic
        const viewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
        if (!viewed.includes(parseInt(id))) {
            const newViewed = [parseInt(id), ...viewed].slice(0, 10);
            localStorage.setItem('recentlyViewed', JSON.stringify(newViewed));
        }

        // Check if item is already in cart to set initial button state
        const cartResponse = await axios.get('http://localhost:5000/api/cart/1'); // Hardcoded userId: 1
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
    // If item is already in cart, navigate to cart page
    if (isInCart) {
      navigate("/cart");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/cart/add", {
        productId: product.id,
      });
      
      await refreshCart();
      setIsInCart(true); // Change button text to "GO TO CART"
      
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
              {/* Dynamic Class and Inline Style for Grey/White state */}
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

          <div className="pdp-offers-section" style={{marginBottom: '24px'}}>
              <div style={{fontSize: '16px', fontWeight: '500', marginBottom: '10px'}}>Available offers</div>
              <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                  <div style={{display:'flex', alignItems:'center', fontSize:'14px'}}>
                      <FaTag color="#388e3c" style={{marginRight:'10px'}} />
                      <span><strong>Bank Offer</strong> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card <span style={{color:'#2874f0', cursor:'pointer'}}>T&C</span></span>
                  </div>
                  <div style={{display:'flex', alignItems:'center', fontSize:'14px'}}>
                      <FaTag color="#388e3c" style={{marginRight:'10px'}} />
                      <span><strong>Bank Offer</strong> 10% Off on Bank of Baroda Mastercard debit card first time transaction, Terms and Condition apply <span style={{color:'#2874f0', cursor:'pointer'}}>T&C</span></span>
                  </div>
                  <div style={{display:'flex', alignItems:'center', fontSize:'14px'}}>
                      <FaTag color="#388e3c" style={{marginRight:'10px'}} />
                      <span><strong>Partner Offer</strong> Purchase now & get a surprise cashback coupon for January / February 2023 <span style={{color:'#2874f0', cursor:'pointer'}}>Know More</span></span>
                  </div>
              </div>
          </div>
          
          <div className="pdp-description">
              <h3>Product Description</h3>
              <p style={{fontSize:'14px', lineHeight:'1.5', color:'#212121'}}>{product.description}</p>
          </div>

          <div className="pdp-specifications">
               <h3>Specifications</h3>
               <div className="spec-table">
                   <div className="spec-row">
                       <div className="spec-label">In The Box</div>
                       <div className="spec-value">Handset, Adapter, USB Cable, Sim Eject Tool</div>
                   </div>
                   <div className="spec-row">
                       <div className="spec-label">Model Number</div>
                       <div className="spec-value">{product.title.split(' ')[0]} 2024</div>
                   </div>
                   <div className="spec-row">
                       <div className="spec-label">Category</div>
                       <div className="spec-value">{product.category}</div>
                   </div>
                   <div className="spec-row">
                       <div className="spec-label">Warranty</div>
                       <div className="spec-value">1 Year Manufacturer Warranty</div>
                   </div>
               </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;