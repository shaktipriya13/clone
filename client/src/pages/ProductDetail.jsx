import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        setLoading(false);

        // Track Recently Viewed
        const viewed = JSON.parse(localStorage.getItem("viewed_products") || "[]");
        if (!viewed.includes(Number(id))) {
            const newViewed = [Number(id), ...viewed].slice(0, 10); // Keep last 10
            localStorage.setItem("viewed_products", JSON.stringify(newViewed));
        }
      } catch (error) {
        console.error("Error fetching product:", error);
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
        quantity: 1,
      });
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="pdp-container">
      <div className="pdp-wrapper">
        <div className="pdp-image-section">
          <div className="pdp-image-container">
            <img src={product.image || "https://via.placeholder.com/400"} alt={product.title} />
          </div>
          <div className="pdp-buttons">
            <button className="add-to-cart-btn" onClick={addToCart}>
              <svg width="16" height="16" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "4px" }}><path d="M15.32 2.405H4.887C3.001 2.405 2.46.22 2.46.22H.39c-.19 0-.39.157-.39.432v.284c0 .248.248.432.39.432h1.637c-.328 3.518-1.527 8.528-1.527 8.528 0 1.259.957 2.15 1.938 2.15h11.23c.27 0 .548-.22.548-.47v-.36c0-.28-.278-.51-.548-.51H3.146c-.25 0-.41-.18-.41-.29l.13-.85h11.753c.27 0 .548-.22.548-.47v-.36c0-.28-.278-.51-.548-.51H3.393l.135-.89h10.63c.27 0 .548-.22.548-.47v-.36c0-.28-.278-.51-.548-.51H3.636l.203-1.42h10.932c.27 0 .548-.22.548-.47v-.36c0-.28-.278-.51-.548-.51zM3.882 13.06c.55 0 .995.446.995.996 0 .55-.446.996-.995.996-.55 0-.995-.446-.995-.996 0-.55.445-.996.995-.996zm9.955 0c.55 0 .995.446.995.996 0 .55-.446.996-.995.996-.55 0-.995-.446-.995-.996 0-.55.445-.996.995-.996z" fill="#fff"></path></svg>
               ADD TO CART
            </button>
            <button className="buy-now-btn" onClick={() => window.location.href = '/checkout'}>
              <svg width="16" height="16" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "4px" }}><path d="M8.2 2.6c0 .4-.3.7-.7.7S6.8 3 6.8 2.6c0-.4.3-.7.7-.7.4 0 .7.3.7.7zm4.2 8.7c0 .4-.3.7-.7.7s-.7-.3-.7-.7.3-.7.7-.7c.4 0 .7.3.7.7zm2.7-8.7c0 .4-.3.7-.7.7-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7.4 0 .7.3.7.7zM.8 1.4c0 .4-.3.7-.7.7C0 1.9 0 1.4 0 1.4h1.4zM4.6 9.6c.4 0 .7.3.7.7 0 .4-.3.7-.7.7s-.7-.3-.7-.7c0-.4.3-.7.7-.7zm-.1-1.3l.1-1.2h10.7l-.4 3.3H5.7l-.1-1.3-.1-.8zM3.4 3.7c0-.4.3-.7.7-.7s.7.3.7.7-.3.7-.7.7c-.4 0-.7-.3-.7-.7zm1.1 5.9h.1l.1-1.2h10.7l-.4 3.3H5.7l-.1-1.3-.1-.8zM3.4 3.7c0-.4.3-.7.7-.7s.7.3.7.7-.3.7-.7.7c-.4 0-.7-.3-.7-.7z" fill="#fff"></path></svg>
               BUY NOW
            </button>
          </div>
        </div>

        <div className="pdp-details-section">
          <h1 className="pdp-title">{product.title}</h1>
          <div className="pdp-rating-row">
            <span className="pdp-rating">4.4 ★</span>
            <span className="pdp-reviews">1,234 Ratings & 100 Reviews</span>
          </div>
          <div className="pdp-price-row">
            <span className="pdp-price">₹{product.price.toLocaleString()}</span>
            <span className="pdp-original-price">₹{(product.price * 1.2).toFixed(0)}</span>
            <span className="pdp-discount">20% off</span>
          </div>
          
          <div className="pdp-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="pdp-specifications">
            <h3>Specifications</h3>
            <div className="spec-row">
               <span className="spec-label">Category</span>
               <span className="spec-value">{product.category}</span>
            </div>
             <div className="spec-row">
               <span className="spec-label">Warranty</span>
               <span className="spec-value">1 Year Manufacturer Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
