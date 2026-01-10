import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProfileSidebar from "../components/ProfileSidebar"; // Assuming we share this sidebar
import Loader from "../components/Loader";
import "../styles/Orders.css"; // We will create this

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const response = await axios.get(import.meta.env.VITE_API_URL + "/api/orders", config);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="orders-page-container">
        <div className="orders-layout">
            <ProfileSidebar />
            <div className="orders-content">
                 {orders.length === 0 ? (
                     <div className="no-orders">
                         <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/myorders-empty_d4880e.png" alt="No Orders" />
                         <h3>No Orders found</h3>
                         <Link to="/" className="shop-btn">Start Shopping</Link>
                     </div>
                 ) : (
                     <div className="orders-list">
                         {orders.map(order => (
                             <div key={order.id} className="order-card">
                                 <div className="order-header">
                                     <span>Order ID: {order.id}</span>
                                     <span>Ordered on {new Date(order.createdAt).toDateString()}</span>
                                     <span>Total: ₹{order.total_amount.toLocaleString()}</span>
                                 </div>
                                 <div className="order-items">
                                     {order.OrderItems.map(item => (
                                         <div key={item.id} className="order-item-row">
                                             <div className="order-img-box">
                                                 <img src={item.Product.image} alt={item.Product.title} />
                                             </div>
                                             <div className="order-details-box">
                                                 <Link to={`/product/${item.Product.id}`} className="order-item-title">
                                                     {item.Product.title}
                                                 </Link>
                                                  <div className="order-status">
                                                     <div className="status-dot green"></div>
                                                     <span>Delivered</span>
                                                 </div>
                                             </div>
                                            <div className="order-rate-box">
                                                <span>Rate & Review Product</span>
                                            </div>
                                         </div>
                                     ))}
                                 </div>
                             </div>
                         ))}
                     </div>
                 )}
            </div>
        </div>
    </div>
  );
};

export default Orders;
