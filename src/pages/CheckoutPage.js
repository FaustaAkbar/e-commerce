import { useLocation } from 'react-router-dom';

const CheckoutPage = () => {
  const location = useLocation();
  const { cartItems } = location.state || { cartItems: [] }; // Ambil data keranjang

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="checkout-page">
      <h1>Checkout Summary</h1>
      <div className="checkout-items">
        {cartItems.map((item, index) => (
          <div key={index} className="checkout-item">
            <img src={item.image} alt={item.name} className="checkout-image" />
            <div className="checkout-details">
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: Rp.{item.price}</p>
              <p>Total: Rp.{item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <h2>Total Price: Rp.{calculateTotal()}</h2>
    </div>
  );
};

export default CheckoutPage;
