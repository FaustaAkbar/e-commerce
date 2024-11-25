// Fungsi untuk membuka popup pembayaran
function openPaymentPopup() {
  document.getElementById('paymentPopup').style.display = 'flex';
}

// Fungsi untuk menutup popup pembayaran
function closePaymentPopup() {
  document.getElementById('paymentPopup').style.display = 'none';
}

// Load item dari LocalStorage ke halaman checkout
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
        <button class="minus" data-id="${item._id}">−</button>
        <span class="quantity" data-id="${item._id}">${item.quantity}</span>
        <button class="plus" data-id="${item._id}">+</button>
      </div>
      <p class="price">Rp. ${item.price * item.quantity}</p>
      <button class="delete" data-id="${item._id}">🗑</button>
    `;

    cartItemsContainer.appendChild(cartItemDiv);
    subtotal += item.price * item.quantity;
  });

  // Update subtotal dan total
  const subtotalElem = document.getElementById('subtotal');
  const totalElem = document.getElementById('total');
  subtotalElem.textContent = `Rp. ${subtotal}`;
  totalElem.textContent = `Rp. ${subtotal}`;

  // Tambahkan event listener untuk tombol quantity dan delete
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

// Fungsi untuk menambah quantity item
function handleIncrease(event) {
  const itemId = event.target.dataset.id;
  updateCartItemQuantity(itemId, 1);
}

// Fungsi untuk mengurangi quantity item
function handleDecrease(event) {
  const itemId = event.target.dataset.id;
  updateCartItemQuantity(itemId, -1);
}

// Fungsi untuk mengupdate quantity item di keranjang
function updateCartItemQuantity(itemId, change) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find((i) => i._id === itemId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeCartItem(itemId);
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
      location.reload(); // Refresh halaman untuk mencerminkan perubahan
    }
  }
}

// Fungsi untuk menghapus item dari keranjang
function handleDelete(event) {
  const itemId = event.target.dataset.id;
  removeCartItem(itemId);
}

function removeCartItem(itemId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const updatedCart = cart.filter((item) => item._id !== itemId);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  location.reload(); // Refresh halaman untuk mencerminkan perubahan
}
