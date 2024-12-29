/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useCart } from '../../context/cartContext';

const Card = ({ item }) => {
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useCart();

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(item, quantity);
      alert(`Added ${quantity} ${item.itemName}(s) to cart\nTotal: Rp.${item.price * quantity}`);
      setQuantity(0); // Reset quantity after adding to cart
    } else {
      alert('Please select quantity first');
    }
  };

  return (
    <div className="card flex flex-col items-center p-4 border-2 border-dashed border-green-500 rounded-lg bg-green-50 transition-transform duration-200 hover:scale-105">
      <div className="image-container mb-4 flex justify-center">
        <img src={item.imageUrl} alt={item.itemName} className="dish-image w-40 h-40 object-cover rounded-full" style={{ width: '160px', height: '160px' }} />
      </div>
      <div className="content-container text-center">
        <h3 className="text-lg font-semibold mb-2">{item.itemName}</h3>
        <p className="price text-lg font-bold text-gray-800 mb-4">Rp.{item.price}</p>
        <div className="quantity-control flex justify-center items-center gap-4 mb-4">
          <button className="quantity-btn bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center" onClick={handleDecrease}>
            -
          </button>
          <span className="quantity text-lg">{quantity}</span>
          <button className="quantity-btn bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center" onClick={handleIncrease}>
            +
          </button>
        </div>
        <button className="add-to-cart bg-green-500 text-white py-2 px-4 rounded-lg w-full font-semibold transition-colors duration-200 hover:bg-green-600" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
