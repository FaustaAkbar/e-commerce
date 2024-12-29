// src/context/cartContext.js
import React, { createContext, useContext, useState } from 'react';

// Membuat konteks Cart
const CartContext = createContext();

// Hook untuk menggunakan CartContext
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider untuk membungkus aplikasi
export const CartProvider = ({ children }) => {
  // State untuk menyimpan item di dalam keranjang
  const [cartItems, setCartItems] = useState([]);

  // Fungsi untuk mendapatkan jumlah total item di keranjang
  const getTotalItems = () => {
    return cartItems.length; // Mengembalikan jumlah item
  };

  // Fungsi untuk menambahkan item ke keranjang
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  return <CartContext.Provider value={{ cartItems, getTotalItems, addToCart }}>{children}</CartContext.Provider>;
};
