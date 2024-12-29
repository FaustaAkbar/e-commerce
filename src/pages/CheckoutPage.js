import React, { useState } from 'react';
import { useCart } from '../context/cartContext';
import { useLocation } from 'react-router-dom';

const CartItem = ({ item, updateQuantity }) => {
  return (
    <div key={item._id} className="flex items-center justify-between bg-white shadow-md p-4 rounded mb-4">
      <img src={item.imageUrl} alt={item.itemName} className="w-20 h-16 object-cover rounded" />
      <div className="flex-grow px-4">
        <h3 className="font-bold text-lg">{item.itemName}</h3>
        <p className="text-gray-600">Rp {item.price.toLocaleString()}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={() => updateQuantity(item._id, -1)} aria-label="Decrease quantity" className="text-white bg-green-500 px-3 py-1 rounded hover:bg-green-600">
          -
        </button>
        <span className="text-lg font-bold">{item.quantity}</span>
        <button onClick={() => updateQuantity(item._id, 1)} aria-label="Increase quantity" className="text-white bg-green-500 px-3 py-1 rounded hover:bg-green-600">
          +
        </button>
      </div>
      <button onClick={() => updateQuantity(item._id, -item.quantity)} aria-label="Remove item" className="text-red-500 hover:text-red-700">
        🗑
      </button>
    </div>
  );
};

const PaymentModal = ({ isOpen, onClose, openQRISModal, openCashierModal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-green-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl text-white font-bold mb-4 text-center">Pilih Metode Pembayaran</h2>
        <div className="flex justify-around">
          <div className="flex flex-col items-center">
            <img
              src="/images/qris.png"
              alt="QRIS"
              className="w-20 h-20 cursor-pointer"
              onClick={() => {
                onClose(); // Close the first modal
                openQRISModal(); // Open the second modal with larger QRIS image
              }}
            />
            <span className="mt-2 text-white">QRIS</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/images/cashier.png"
              alt="Bayar di Kasir"
              className="w-20 h-20 cursor-pointer"
              onClick={() => {
                onClose(); // Close the modal
                openCashierModal(); // Open the "waiting for confirmation" modal
              }}
            />
            <span className="mt-2 text-white">Bayar di Kasir</span>
          </div>
        </div>
        <button onClick={onClose} className="mt-6 w-full bg-white text-green-800 py-2 rounded hover:bg-gray-300">
          Close
        </button>
      </div>
    </div>
  );
};

const QRISModal = ({ isOpen, onClose }) => {
  const [isWaitingForConfirmation, setIsWaitingForConfirmation] = useState(false);

  if (!isOpen) return null;

  const handleConfirmation = () => {
    setIsWaitingForConfirmation(true);

    // Simulate waiting for confirmation (for example, 3 seconds)
    setTimeout(() => {
      setIsWaitingForConfirmation(false); // This is where you would stop waiting for confirmation
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {!isWaitingForConfirmation ? (
        <div className="bg-green-800 p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl text-white font-bold mb-4 text-center">Silakan Tunjukkan Bukti Pembayaran Anda di Kasir</h2>
          <div className="flex justify-center mb-4">
            <img src="/images/qris.png" alt="QRIS" className="w-64 h-64" />
          </div>
          <button onClick={handleConfirmation} className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold">
            Konfirmasi Pembayaran
          </button>
          {/* Close button with a more neutral style */}
          <button onClick={onClose} className="mt-6 w-full bg-white text-green-800 py-2 rounded hover:bg-gray-300">
            Close
          </button>
        </div>
      ) : (
        <CashierModal isOpen={isWaitingForConfirmation} onClose={() => setIsWaitingForConfirmation(false)} />
      )}
    </div>
  );
};

const CashierModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-green-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl text-white font-bold mb-4 text-center">Menunggu Pesanan Anda Dikonfirmasi...</h2>
        <div className="text-white text-center mt-4">
          <p>Pesanan sedang diproses, harap tunggu konfirmasi dari kasir.</p>
        </div>
      </div>
    </div>
  );
};

const ShoppingCart = () => {
  const { cartItems, updateQuantity, getSubtotal } = useCart();
  const location = useLocation();
  const cart = location.state?.cartItems || cartItems;
  const [orderType, setOrderType] = useState('Take Away');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isQRISModalOpen, setQRISModalOpen] = useState(false);
  const [isCashierModalOpen, setCashierModalOpen] = useState(false);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  const handleOrderTypeChange = (event) => {
    setOrderType(event.target.value);
  };

  const handleCheckout = () => {
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-green-100 p-6">
      <h1 className="text-4xl font-bold text-green-800 mb-16 mt-5">MY CART</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-10">Shopping Items</h2>
          {cart && cart.length > 0 ? cart.map((item) => <CartItem key={item._id} item={item} updateQuantity={updateQuantity} />) : <p>Your cart is empty.</p>}
        </div>
        <div className="bg-green-200 p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rp {calculateSubtotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping (Free Delivery)</span>
              <span>Rp 0</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total (Tax incl.)</span>
              <span>Rp {calculateTotal().toLocaleString()}</span>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="align-middle text-xl font-semibold mb-2 ">Order Type</h2>
            <div className="flex items-center space-x-4">
              <label className="flex items-center p-2 bg-white shadow rounded cursor-pointer hover:bg-green-100">
                <input type="radio" value="Take Away" checked={orderType === 'Take Away'} onChange={handleOrderTypeChange} className="mr-2 form-radio text-green-500" />
                <span className="text-green-700 font-semibold">Take Away</span>
              </label>
              <label className="flex items-center p-2 bg-white shadow rounded cursor-pointer hover:bg-green-100">
                <input type="radio" value="Dine In" checked={orderType === 'Dine In'} onChange={handleOrderTypeChange} className="mr-2 form-radio text-green-500" />
                <span className="text-green-700 font-semibold">Dine In</span>
              </label>
            </div>
          </div>
          <button onClick={handleCheckout} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 shadow-lg font-semibold text-lg">
            Checkout
          </button>
        </div>
      </div>
      <PaymentModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} openQRISModal={() => setQRISModalOpen(true)} openCashierModal={() => setCashierModalOpen(true)} />
      <QRISModal isOpen={isQRISModalOpen} onClose={() => setQRISModalOpen(false)} />
      <CashierModal isOpen={isCashierModalOpen} onClose={() => setCashierModalOpen(false)} />
    </div>
  );
};

export default ShoppingCart;
