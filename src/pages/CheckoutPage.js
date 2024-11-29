import '../styles/checkoutPage.css';

function CheckoutPage(){
    
    return (
        <div className="container">
        <div className="cart-container">
            <h1><span><img src="../images/ZexOrder.png" alt="Zek Order Logo" className="logo-image" /></span></h1>
            <hr className="divider" />
            <p className="section-title">Shopping Item</p>
            
            <div className="cart-items">
                {/* Cart Item Template */}
                <div className="cart-item">
                    <img src="../images/vermicelli-upma.jpg" alt="Vermicelli Upma" />
                    <p className="item-name">Vermicelli Upma</p>
                    <div className="quantity-controls">
                        <button className="minus">−</button>
                        <span className="quantity">00</span>
                        <button className="plus">+</button>
                    </div>
                    <p className="price">₹200</p>
                    <button className="delete">🗑️</button>
                </div>

                <div className="cart-item">
                    <img src="../images/vermicelli-upma.jpg" alt="Vermicelli Upma" />
                    <p className="item-name">Vermicelli Upma</p>
                    <div className="quantity-controls">
                        <button className="minus">−</button>
                        <span className="quantity">00</span>
                        <button className="plus">+</button>
                    </div>
                    <p className="price">₹200</p>
                    <button className="delete">🗑️</button>
                </div>

                <div className="cart-item">
                    <img src="../images/vermicelli-upma.jpg" alt="Vermicelli Upma" />
                    <p className="item-name">Vermicelli Upma</p>
                    <div className="quantity-controls">
                        <button className="minus">−</button>
                        <span className="quantity">00</span>
                        <button className="plus">+</button>
                    </div>
                    <p className="price">₹200</p>
                    <button className="delete">🗑️</button>
                </div>

                <div className="cart-item">
                    <img src="../images/vermicelli-upma.jpg" alt="Vermicelli Upma" />
                    <p className="item-name">Vermicelli Upma</p>
                    <div className="quantity-controls">
                        <button className="minus">−</button>
                        <span className="quantity">00</span>
                        <button className="plus">+</button>
                    </div>
                    <p className="price">₹200</p>
                    <button className="delete">🗑️</button>
                </div>

                {/* Repeat the item above for as many items as needed */}
            </div>
        </div>

        {/* Right side (Checkout Details) */}
        <div className="checkout-container">
            <h2>Card Details</h2>
            <form className="card-details">
                <div className="profile-img">
                    <img src="../images/people.png" alt="Profile" />
                </div>
                <label htmlFor="name">Name on card</label>
                <input type="text" id="name" placeholder="Name" />
                
                <label htmlFor="card-number">Card Number</label>
                <input type="text" id="card-number" placeholder="1111 2222 3333 4444" />
                
                <div className="card-info">
                    <div>
                        <label htmlFor="expiry">Expiration date</label>
                        <input type="text" id="expiry" placeholder="mm/yy" />
                    </div>
                    <div>
                        <label htmlFor="cvv">CVV</label>
                        <input type="text" id="cvv" placeholder="123" />
                    </div>
                </div>

                <div className="summary">
                    <p>Subtotal <span id="subtotal">₹1668</span></p>
                    <p>Shipping (Free Delivery) <span>₹0</span></p>
                    <p>Total (Tax incl.) <span id="total">₹1672</span></p>
                </div>
                <button className="checkout">Checkout</button>
            </form>
        </div>
        </div>
    )
}export default CheckoutPage