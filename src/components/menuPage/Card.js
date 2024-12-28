/* eslint-disable react/prop-types */
import { useState } from 'react';

const Card = ({ item }) => {
  const [quantity, setQuantity] = useState(0);

  // Fallback untuk properti kosong
  const itemName = item.itemName || 'No Name';
  const itemImage = item.imageUrl || 'https://via.placeholder.com/150';
  const itemPrice = item.price || 0;
  const itemRating = item.rating || 0;

  // Decrease quantity handler
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  // Increase quantity handler
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  // Add to cart button handler
  const handleAddToCart = () => {
    if (quantity > 0) {
      alert(`Added ${quantity} ${itemName}(s) to cart\nTotal: Rp.${(itemPrice * quantity).toLocaleString()}`);
      setQuantity(0); // Reset quantity
    } else {
      alert('Please select quantity first');
    }
  };

  return (
    <div className="max-w-md rounded-lg shadow-lg bg-white border border-green-300 overflow-hidden m-4 p-6">
      {/* Gambar Produk */}
      <div className="flex justify-center items-center">
        <div className="rounded-full p-2 bg-green-200 border border-dotted border-green-500 shadow-lg transform hover:scale-105 transition-transform duration-300">
          <img src={itemImage} alt={itemName} className="w-40 h-40 rounded-full object-cover" />
        </div>
      </div>

      {/* Informasi Produk */}
      <div className="p-4 text-center">
        <h3 className="text-xl font-semibold text-gray-800">{itemName}</h3>
        <p className="text-yellow-400">⭐ {itemRating}/5</p>
        <p className="text-lg font-bold text-green-600">Rp. {itemPrice.toLocaleString()}</p>

        {/* Quantity controller */}
        <div className="flex items-center justify-center space-x-4 mt-4">
          <button className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center" onClick={handleDecrease}>
            -
          </button>
          <span className="text-xl">{quantity}</span>
          <button className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center" onClick={handleIncrease}>
            +
          </button>
        </div>

        {/* Tombol Add to Cart */}
        <button className="w-full mt-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
