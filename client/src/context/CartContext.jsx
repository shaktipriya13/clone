import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // Fetch initial cart count
 const fetchCartCount = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL + '/api/cart/');
    if (response.data && response.data.CartItems) {
      // FIX: Sum up the quantities of all items instead of just the array length
     const totalItems = response.data.CartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
     setCartCount(totalItems);
    } else {
      setCartCount(0); // Ensure it resets to 0 if cart is empty
    }
  } catch (error) {
    console.error("Error fetching cart count:", error);
    setCartCount(0);
  }
};

  useEffect(() => {
    fetchCartCount();
  }, []);

  const addToCartContext = async (productId) => {
      await fetchCartCount();
  };
  
  const refreshCart = async () => {
      await fetchCartCount();
  }

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

