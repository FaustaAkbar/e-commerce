// Function to open the payment popup
function openPaymentPopup() {
  document.getElementById('paymentPopup').style.display = 'flex';
}

// Function to close the payment popup
function closePaymentPopup() {
  document.getElementById('paymentPopup').style.display = 'none';
}
document.addEventListener('DOMContentLoaded', function () {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  let subtotal = 0;

  cart.forEach((item) => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');

    cartItemDiv.innerHTML = `
          <img src="${item.imageUrl || '../images/default-item.jpg'}" alt="${item.itemName}" />
          <p class="item-name">${item.itemName}</p>
          <div class="quantity-controls">
              <button class="minus" data-id="${item.id}">−</button>
              <span class="quantity" data-id="${item.id}">${item.quantity}</span>
              <button class="plus" data-id="${item.id}">+</button>
          </div>
          <p class="price">Rp. ${item.price * item.quantity}</p>
          <button class="delete" data-id="${item.id}">🗑</button>
      `;

    cartItemsContainer.appendChild(cartItemDiv);
    subtotal += item.price * item.quantity;
  });

  // Update subtotal and total
  const subtotalElem = document.getElementById('subtotal');
  const totalElem = document.getElementById('total');
  subtotalElem.textContent = `Rp. ${subtotal}`;
  totalElem.textContent = `Rp. ${subtotal}`;

  // Add event listeners for quantity and delete buttons
  document.querySelectorAll('.plus').forEach((button) => {
    button.addEventListener('click', handleIncrease);
  });

  document.querySelectorAll('.minus').forEach((button) => {
    button.addEventListener('click', handleDecrease);
  });

  document.querySelectorAll('.delete').forEach((button) => {
    button.addEventListener('click', handleDelete);
  });
});

// Increase quantity
function handleIncrease(event) {
  const itemId = event.target.dataset.id;
  updateCartItemQuantity(itemId, 1);
}

// Decrease quantity
function handleDecrease(event) {
  const itemId = event.target.dataset.id;
  updateCartItemQuantity(itemId, -1);
}

// Update item quantity in cart
function updateCartItemQuantity(itemId, change) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find((i) => i.id === itemId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeCartItem(itemId);
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
      location.reload(); // Refresh page to reflect changes
    }
  }
}

// Remove item from cart
function removeCartItem(itemId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const updatedCart = cart.filter((item) => item.id !== itemId);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  location.reload(); // Refresh page to reflect changes
}
