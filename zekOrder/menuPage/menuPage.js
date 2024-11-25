// Fungsi untuk membuka dan menutup kotak pencarian
function toggleSearchBox() {
  const searchBox = document.getElementById('search-box');
  if (searchBox.style.display === 'none' || searchBox.style.display === '') {
    searchBox.style.display = 'block';
    setTimeout(() => {
      searchBox.style.opacity = 1;
    }, 200);
  } else {
    searchBox.style.opacity = 0;
    setTimeout(() => {
      searchBox.style.display = 'none';
    }, 300);
  }
}

// Fungsi untuk membuka dan menutup navigasi
function toggleNav() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault(); // Mencegah scroll bawaan browser
      const targetId = this.getAttribute('href').substring(1); // Ambil ID dari href
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth', // Scroll halus
          block: 'start',
        });

        // Tambahkan class active pada link yang diklik
        navLinks.forEach((nav) => nav.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // Ambil data menu dari API
  fetch('http://127.0.0.1:3000/api/menu')
    .then((response) => response.json())
    .then((data) => {
      // Simpan data untuk pencarian
      window.menuData = data;

      // Menampilkan kategori Hidangan Terbaik
      displayMenuItems(
        data.filter((item) => item.isBest),
        'popular-cards'
      );

      // Menampilkan kategori Makanan
      displayMenuItems(
        data.filter((item) => item.category === 'Makanan'),
        'makanan-cards'
      );

      // Menampilkan kategori Minuman
      displayMenuItems(
        data.filter((item) => item.category === 'Minuman'),
        'minuman-cards'
      );
    })
    .catch((error) => console.error('Error fetching menu data:', error));
});

// Fungsi untuk menampilkan item menu
function displayMenuItems(items, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  items.forEach((item) => {
    const card = createCard(item);
    container.appendChild(card);
  });
}

// Fungsi untuk membuat kartu item
function createCard(item) {
  const card = document.createElement('div');
  card.classList.add('dish-card');

  const imageUrl = item.imageUrl || 'default.png'; // Gambar default jika tidak ada
  card.innerHTML = `
    <img src="${imageUrl}" alt="${item.itemName}">
    <h3>${item.itemName}</h3>
    <p>${item.description}</p>
    <p>Rp <span class="price">${item.price}</span></p>
    <div class="quantity-control">
      <button class="minus">-</button>
      <span class="quantity">0</span>
      <button class="plus">+</button>
    </div>
    <button class="add-to-cart">Add to Cart</button>
  `;

  const quantityElement = card.querySelector('.quantity');
  let quantity = 0;

  card.querySelector('.plus').addEventListener('click', () => {
    quantity++;
    quantityElement.textContent = quantity;
  });

  card.querySelector('.minus').addEventListener('click', () => {
    if (quantity > 0) {
      quantity--;
      quantityElement.textContent = quantity;
    }
  });

  card.querySelector('.add-to-cart').addEventListener('click', () => {
    if (quantity > 0) {
      addToCart(item, quantity);
      alert(`${item.itemName} telah ditambahkan ke keranjang!`);
      window.location.href = '/checkoutPage/checkoutPage.html'; // Arahkan ke halaman checkout
    } else {
      alert('Silakan pilih jumlah produk!');
    }
  });

  return card;
}

// Fungsi untuk menambah item ke keranjang
function addToCart(item, quantity) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find((cartItem) => cartItem._id === item._id);

  if (existingItem) {
    existingItem.quantity += quantity; // Tambahkan jumlah
  } else {
    cart.push({ ...item, quantity }); // Tambahkan item baru ke keranjang
  }

  localStorage.setItem('cart', JSON.stringify(cart)); // Simpan ke LocalStorage
}

// Fungsi untuk menangani pencarian
function handleSearch() {
  const searchQuery = document.getElementById('search-input').value.toLowerCase();
  const searchResultsSection = document.getElementById('search-results-section');
  const searchResultsContainer = document.getElementById('search-results');

  // Kosongkan hasil pencarian sebelumnya
  searchResultsContainer.innerHTML = '';

  // Tampilkan atau sembunyikan section hasil pencarian
  if (searchQuery === '') {
    searchResultsSection.style.display = 'none';
  } else {
    searchResultsSection.style.display = 'block';
  }

  // Filter dan tampilkan kartu yang sesuai dengan hasil pencarian
  const searchResults = window.menuData.filter((item) => item.itemName.toLowerCase().includes(searchQuery) || item.description.toLowerCase().includes(searchQuery));

  // Tampilkan hasil pencarian di section hasil pencarian
  displayMenuItems(searchResults, 'search-results');
}
