import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import ProfileSidebar from "../components/ProfileSidebar";
import Loader from "../components/Loader";
import "../styles/Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setWishlist([]); // Or redirect to login
        setLoading(false);
        return;
      }
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const response = await axios.get(import.meta.env.VITE_API_URL + "/api/wishlist", config);
      setWishlist(response.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
      setItemToDelete(id);
      setShowDeleteModal(true);
  };

 const handleDelete = async () => {
  if (!itemToDelete) return;

  try {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/wishlist/remove/${itemToDelete}`,
      config
    );

    setWishlist(prev =>
      prev.filter(item => item.Product.id !== itemToDelete)
    );

    toast.success("Item removed from wishlist");
  } catch (error) {
    console.error("Error removing item:", error);
    toast.error("Failed to remove item");
  } finally {
    setShowDeleteModal(false);
    setItemToDelete(null);
  }
};


  if (loading) return <Loader />;

  return (
    <div className="wishlist-container">
       <div className="wishlist-layout">
           <ProfileSidebar />
           
           <div className="wishlist-content">
               <div className="wishlist-header-card">
                   My Wishlist ({wishlist.length})
               </div>

               <div className="wishlist-list">
                   {wishlist.length > 0 ? (
                       wishlist.map((item) => (
                           <div key={item.id} className="wishlist-item-row">
                               <div className="wishlist-item-img-container">
                                   <img src={item.Product.image} alt={item.Product.title} />
                               </div>
                               <div className="wishlist-item-details">
                                   <Link to={`/product/${item.Product.id}`} className="item-title-link">
                                       {item.Product.title}
                                   </Link>
                                   <div className="rate-row">
                                       <span className="rating-badge">4.4 ★</span> 
                                       <span className="rating-count">(1,234)</span>
                                   </div>
                                   <div className="price-row">
                                       <span className="current-price">₹{item.Product.price.toLocaleString()}</span>
                                       <span className="original-price">₹{(item.Product.price * 1.25).toFixed(0)}</span>
                                       <span className="discount-off">20% off</span>
                                   </div>
                               </div>
                               <div className="wishlist-delete-btn" onClick={() => confirmDelete(item.Product.id)}>
                                   <FaTrash className="trash-icon" />
                               </div>
                           </div>
                       ))
                   ) : (
                       <div className="empty-wishlist">
                           <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/mywishlist-empty_39f7a5.png" alt="Empty Wishlist"/>
                           <h3>Empty Wishlist</h3>
                           <p>You have no items in your wishlist. Start adding!</p>
                           <Link to="/" style={{color: '#2874f0', fontWeight: '500', marginTop: '10px'}}>Shop Now</Link>
                       </div>
                   )}
               </div>
           </div>
       </div>

       {/* Delete Confirmation Modal */}
       {showDeleteModal && (
           <div className="modal-overlay">
               <div className="delete-modal">
                   <div className="modal-message">Are you sure you want to remove this product?</div>
                   <div className="modal-actions">
                       <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>CANCEL</button>
                       <button className="confirm-btn" onClick={handleDelete}>YES, REMOVE</button>
                   </div>
               </div>
           </div>
       )}
    </div>
  );
};

export default Wishlist;
