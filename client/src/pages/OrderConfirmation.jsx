import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || 'OD' + Math.floor(Math.random() * 1000000000);

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="success-icon-container">
            <img src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/order-placed_e6a640.png" alt="Success" className="success-img"/>
        </div>
        <div className="confirmation-text">
            <h2>Order Placed for ₹{location.state?.totalAmount?.toLocaleString() || '11,849'}!</h2>
            <p className="order-id">Order ID: {orderId}</p>
            <p className="email-msg">Confirmation will be sent to your email.</p>
        </div>
        <div className="confirmation-actions">
            <Link to="/" className="shop-more-btn">Shop More</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
