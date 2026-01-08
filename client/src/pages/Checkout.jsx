import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Checkout.css";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(1); // Default to first address

  const addresses = [
    {
      id: 1,
      name: "Shakti Priya",
      phone: "9263335772",
      address: "Dhanbad, Jharkhand - 834003",
      type: "HOME"
    },
    {
      id: 2,
      name: "Shakti Priya",
      phone: "92633357XX",
      address: "Khelgaon, Ranchi, Jharkhand - 835217",
      type: "WORK"
    },
    {
      id: 3,
      name: "Neeraj Kumar",
      phone: "8709633XXX",
      address: "Navi Mumbai, Maharashtra PIN 400705, Navi Mumbai, Maharashtra - 400705",
      type: "HOME"
    }
  ];

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart");
        setCartItems(response.data.CartItems || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.Product.price * item.quantity, 0);
  };

  const totalAmount = calculateTotal();
  const mrp = totalAmount * 1.25;
  const discount = mrp - totalAmount;

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        <div className="checkout-left">
          
          {/* Step 1: Login */}
          <div className="checkout-step completed">
            <div className="step-number">1</div>
            <div className="step-content-wrapper">
                <div className="step-header">
                    <span className="step-title">LOGIN</span>
                    <span className="step-check">✓</span>
                </div>
                <div className="step-preview">
                    <span className="user-contact">+919263335772</span>
                </div>
            </div>
            <button className="change-btn-plain">CHANGE</button>
          </div>

          {/* Step 2: Address (Active) */}
          <div className="checkout-step active">
            <div className="step-header-active">
                <div className="step-number-active">2</div>
                <span className="step-title-active">DELIVERY ADDRESS</span>
            </div>
            
            <div className="address-list">
                {addresses.map((addr) => (
                    <div key={addr.id} className={`address-item ${selectedAddress === addr.id ? 'selected' : ''}`} onClick={() => setSelectedAddress(addr.id)}>
                        <div className="address-header">
                            <input type="radio" checked={selectedAddress === addr.id} readOnly />
                            <span className="addr-name">{addr.name}</span>
                            <span className="addr-type">{addr.type}</span>
                            <span className="addr-phone">{addr.phone}</span>
                        </div>
                        <div className="address-text">
                            {addr.address}
                        </div>
                        {selectedAddress === addr.id && (
                            <button className="deliver-here-btn">DELIVER HERE</button>
                        )}
                         {selectedAddress === addr.id && (
                             <button className="edit-btn">EDIT</button>
                        )}
                    </div>
                ))}
            </div>
            
            <div className="add-address-row">
                 <span className="plus-icon">+</span>
                 <span>Add a new address</span>
            </div>
          </div>

          {/* Step 3: Order Summary */}
          <div className="checkout-step disabled">
             <div className="step-number">3</div>
             <div className="step-title">ORDER SUMMARY</div>
          </div>

           {/* Step 4: Payment */}
           <div className="checkout-step disabled">
             <div className="step-number">4</div>
             <div className="step-title">PAYMENT OPTIONS</div>
          </div>

        </div>

        <div className="checkout-right">
             <div className="price-details-card">
            <div className="price-header">PRICE DETAILS</div>
            <div className="price-body">
              <div className="price-row">
                <span>Price ({cartItems.length} items)</span>
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
                <span>Total Payable</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="savings-message">
                Your Total Savings on this order ₹{discount.toFixed(0)}
              </div>
            </div>
          </div>
          
           <div className="safe-payment-strip" style={{marginTop: '20px'}}>
             <div className="shield-icon">🛡️</div>
             <div>Safe and Secure Payments. Easy returns. 100% Authentic products.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
