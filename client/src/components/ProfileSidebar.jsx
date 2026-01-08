import React from 'react';
import { FaUser, FaFolder, FaWallet, FaPowerOff } from 'react-icons/fa';
import '../styles/ProfileSidebar.css';

const ProfileSidebar = () => {
    return (
        <div className="profile-sidebar">
            <div className="profile-greeting">
                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg" alt="User" className="profile-pic"/>
                <div className="greeting-text">
                    <div className="hello-text">Hello,</div>
                    <div className="user-name">Flipkart User</div>
                </div>
            </div>

            <div className="profile-menu">
                <div className="menu-group">
                   <div className="menu-header">
                        <FaFolder className="menu-icon" color="#2874f0" /> 
                        <span className="menu-title">MY ORDERS</span>
                        <span className="arrow-right">{'>'}</span>
                   </div>
                </div>

                <div className="menu-group">
                    <div className="menu-header">
                        <FaUser className="menu-icon" color="#2874f0" />
                        <span className="menu-title">ACCOUNT SETTINGS</span>
                    </div>
                    <div className="menu-items">
                        <div className="menu-item">Profile Information</div>
                        <div className="menu-item">Manage Addresses</div>
                        <div className="menu-item">PAN Card Information</div>
                    </div>
                </div>

                <div className="menu-group">
                     <div className="menu-header">
                        <FaWallet className="menu-icon" color="#2874f0" />
                        <span className="menu-title">PAYMENTS</span>
                    </div>
                    <div className="menu-items">
                         <div className="menu-item">Gift Cards <span className="green-text">₹0</span></div>
                         <div className="menu-item">Saved UPI</div>
                         <div className="menu-item">Saved Cards</div>
                    </div>
                </div>

                <div className="menu-group">
                    <div className="menu-header">
                        <FaFolder className="menu-icon" color="#2874f0" />
                        <span className="menu-title">MY STUFF</span>
                    </div>
                     <div className="menu-items">
                        <div className="menu-item">My Coupons</div>
                        <div className="menu-item">My Reviews & Ratings</div>
                        <div className="menu-item">All Notifications</div>
                        <div className="menu-item active">My Wishlist</div>
                    </div>
                </div>
                 
                 <div className="menu-group logout-group">
                     <div className="menu-header">
                         <FaPowerOff className="menu-icon" color="#878787" />
                        <span className="menu-title" style={{color: '#878787'}}>Logout</span>
                     </div>
                 </div>

            </div>
        </div>
    );
};

export default ProfileSidebar;
