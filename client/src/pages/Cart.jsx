import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

const Cart = () => {
  const [cartItmes, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshCart } = useCart();

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cart");
      // Backend returns { id, userId, CartItems: [...] }
      setCartItems(response.data.CartItems || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (itemId, currentQty, change) => {
    const newQty = currentQty + change;
    if (newQty < 1) return;

    try {
      await axios.put("http://localhost:5000/api/cart/update", {
        cartItemId: itemId,
        quantity: newQty,
      });
      
      // 2. Refresh both local state AND navbar count
      await fetchCart(); 
      await refreshCart(); 
      
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  const removeItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${itemId}`);
      
      // 3. Refresh both local state AND navbar count
      await fetchCart();
      await refreshCart();
      
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const calculateTotal = () => {
    return cartItmes.reduce((total, item) => total + item.Product.price * item.quantity, 0);
  };

  const calculateDiscount = () => {
     // Mock discount logic matching frontend display (20% off)
     const total = calculateTotal();
     return (total * 0.2); // Just for show, assuming price in DB is discounted price, but let's show some savings
  };
  
  // Real price logic: Assume DB price is the selling price
  const totalAmount = calculateTotal();
  const mrp = totalAmount * 1.25; // Reverse the 20% discount (approx)
  const discount = mrp - totalAmount;

  if (loading) return <div>Loading...</div>;

  if (cartItmes.length === 0) {
    return (
        <div className="cart-empty">
            <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty Cart" className="empty-img" />
            <h3>Your cart is empty!</h3>
            <Link to="/" className="shop-now-btn">Shop Now</Link>
        </div>
    )
  }

  return (
    <div className="cart-container">
      <div className="cart-wrapper">
        <div className="cart-left-section">
          <div className="cart-header">
            Flipkart (1)
            <div className="address-strip">
              Deliver to: <strong>Bangalore - 560001</strong>
              <button className="change-btn">Change</button>
            </div>
          </div>
          
          <div className="cart-items-container">
            {cartItmes.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.Product.image || "https://via.placeholder.com/150"} alt={item.Product.title} />
                </div>
                <div className="cart-item-details">
                  <div className="item-title">{item.Product.title}</div>
                  <div className="item-seller">Seller: RetailNet</div>
                  <div className="item-price-row">
                      <span className="item-original-price">₹{(item.Product.price * 1.2).toFixed(0)}</span>
                      <span className="item-price">₹{item.Product.price.toLocaleString()}</span>
                      <span className="item-discount">20% Off</span>
                  </div>
                  <div className="cart-actions">
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity, -1)} disabled={item.quantity <= 1}> – </button>
                      <input type="text" value={item.quantity} readOnly />
                      <button onClick={() => updateQuantity(item.id, item.quantity, 1)} disabled={item.quantity >= item.Product.stock}> + </button>
                    </div>
                    <button className="action-text-btn">SAVE FOR LATER</button>
                    <button className="action-text-btn" onClick={() => removeItem(item.id)}>REMOVE</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="place-order-section">
            <button className="place-order-btn" onClick={() => window.location.href = '/checkout'}>PLACE ORDER</button>
          </div>
        </div>

        <div className="cart-right-section">
          <div className="price-details-card">
            <div className="price-header">PRICE DETAILS</div>
            <div className="price-body">
              <div className="price-row">
                <span>Price ({cartItmes.length} items)</span>
                <span>₹{mrp.toFixed(0)}</span>
              </div>
              <div className="price-row">
                <span>Discount</span>
                <span className="discount-text">– ₹{discount.toFixed(0)}</span>
              </div>
              <div className="price-row">
                <span>Delivery Charges</span>
                <span className="free-text">Free</span>
              </div>
              <div className="total-row">
                <span>Total Amount</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="savings-message">
                You will save ₹{discount.toFixed(0)} on this order
              </div>
            </div>
          </div>
          
          <div className="safe-payment-strip">
             <div className="shield-icon">🛡️</div>
             <div>Safe and Secure Payments.Easy returns.100% Authentic products.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
