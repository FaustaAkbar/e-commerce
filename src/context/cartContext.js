import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item, quantity) => {
    if (quantity > 0) {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
          // Jika item sudah ada di keranjang, tambahkan kuantitasnya
          return prevItems.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem));
        }
        // Jika item belum ada di keranjang, tambahkan sebagai item baru
        return [...prevItems, { ...item, quantity }];
      });
    }
  };

  const updateQuantity = (id, change) => {
    setCartItems(
      (prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + change } : item)).filter((item) => item.quantity > 0) // Hapus item jika kuantitasnya menjadi 0
    );
  };

  return <CartContext.Provider value={{ cartItems, addToCart, updateQuantity }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
