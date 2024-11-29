/* eslint-disable react/prop-types */
import { useState } from 'react'

const Card = ({ item }) => {
  const [quantity, setQuantity] = useState(0)

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  const handleIncrease = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    if (quantity > 0) {
      alert(`Added ${quantity} ${item.name}(s) to cart\nTotal: Rp.${item.price * quantity}`)
      setQuantity(0) // Reset quantity after adding to cart
    } else {
      alert('Please select quantity first')
    }
  }

  return (
    <div className="card">
      <img src={item.image} alt={item.name} className="dish-image" />
      <h3>{item.name}</h3>
      <p><span className="rating">⭐ {item.rating}/5</span></p>
      <p className="price">Rp.{item.price}</p>
      <div className="quantity-control">
        <button 
          className="quantity-btn decrease" 
          onClick={handleDecrease}
        >
          -
        </button>
        <span className="quantity">{quantity}</span>
        <button 
          className="quantity-btn increase"
          onClick={handleIncrease}
        >
          +
        </button>
      </div>
      <button 
        className="add-to-cart" 
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default Card
