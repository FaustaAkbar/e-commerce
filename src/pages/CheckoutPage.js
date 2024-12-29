import React from 'react';
import { useCart } from '../context/cartContext';

const ShoppingCart = () => {
  const { cartItems, updateQuantity } = useCart();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal(); // Tambahkan logika pajak jika diperlukan
  };

  return (
    <div className="min-h-screen bg-green-100 p-6">
      <h1 className="text-4xl font-bold text-green-800 mb-16 mt-5">MY CART</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-10">Shopping Items</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-white shadow-md p-4 rounded mb-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-grow px-4">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => updateQuantity(item.id, -1)} className="text-white bg-green-500 px-3 py-1 rounded hover:bg-green-600">
                  -
                </button>
                <span className="text-lg font-bold">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="text-white bg-green-500 px-3 py-1 rounded hover:bg-green-600">
                  +
                </button>
              </div>
              <button onClick={() => updateQuantity(item.id, -item.quantity)} className="text-red-500 hover:text-red-700">
                🗑️
              </button>
            </div>
          ))}
        </div>
        <div className="bg-green-200 p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rp{calculateSubtotal()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping (Free Delivery)</span>
              <span>RP</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total (Tax incl.)</span>
              <span>RP{calculateTotal()}</span>
            </div>
          </div>
          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
