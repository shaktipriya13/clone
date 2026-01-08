import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/Wishlist.css";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/wishlist");
        setWishlist(response.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">My Wishlist ({wishlist.length})</div>
      {wishlist.length > 0 ? (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
             <div key={item.id} className="wishlist-item">
                 <ProductCard product={item.Product} />
             </div>
          ))}
        </div>
      ) : (
        <div className="empty-wishlist">
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/mywishlist-empty_39f7a5.png" alt="Empty Wishlist"/>
            <h3>Empty Wishlist</h3>
            <p>You have no items in your wishlist. Start adding!</p>
            <Link to="/" style={{color: '#2874f0', fontWeight: '500', marginTop: '10px'}}>Shop Now</Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
