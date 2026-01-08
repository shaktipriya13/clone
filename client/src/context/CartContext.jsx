import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // Fetch initial cart count
  const fetchCartCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cart/1'); // Hardcoded userId: 1 for now
      if (response.data && response.data.items) {
          // Calculate total quantity or just number of items? 
          // Flipkart usually shows number of items. 
          // Let's count total items in the array for now.
          setCartCount(response.data.items.length);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  const addToCartContext = async (productId) => {
      // Optimistic update or wait for API?
      // For accuracy, let's wait for API success or just refresh count.
      // But typically we want immediate feedback.
      // We will refresh the count after the caller (ProductDetail) successfully adds.
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
