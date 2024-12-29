import React, { createContext, useContext, useState } from 'react';

// Membuat konteks Cart
const CartContext = createContext();

// Hook untuk menggunakan CartContext
export const useCart = () => useContext(CartContext);

// CartProvider untuk membungkus aplikasi
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fungsi untuk menambahkan item ke keranjang
  const addToCart = (item, quantity) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);

      if (existingItem) {
        return prevCart.map((cartItem) => (cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem));
      } else {
        return [...prevCart, { ...item, quantity }];
      }
    });
  };

  // Fungsi untuk memperbarui quantity item di keranjang
  const updateQuantity = (id, delta) => {
    setCartItems(
      (prevCart) => prevCart.map((item) => (item._id === id ? { ...item, quantity: Math.max(item.quantity + delta, 0) } : item)).filter((item) => item.quantity > 0) // Hapus item dengan quantity 0
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        getTotalItems,
        getSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
