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

function toggleNav() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('active');
}

// Seleksi tombol dan input quantity
document.querySelectorAll('.dish-card').forEach((card) => {
  const minusBtn = card.querySelector('.quantity-control button:first-child');
  const plusBtn = card.querySelector('.quantity-control button:last-child');
  const quantityInput = card.querySelector('.quantity-control input');
  const addToCartBtn = card.querySelector('.add-to-cart');

  let quantity = 0; // Default quantity

  // Event untuk tombol minus
  minusBtn.addEventListener('click', () => {
    if (quantity > 0) {
      quantity--;
      quantityInput.value = quantity;
    }
  });

  // Event untuk tombol plus
  plusBtn.addEventListener('click', () => {
    quantity++;
    quantityInput.value = quantity;
  });

  // Event untuk tombol Add to Cart
  addToCartBtn.addEventListener('click', () => {
    if (quantity > 0) {
      alert(`${quantity} item(s) ditambahkan ke keranjang!`);
      // Logic untuk menambahkan ke keranjang bisa ditambahkan di sini
    } else {
      alert('Tambahkan jumlah terlebih dahulu!');
    }
  });
});

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
});

document.addEventListener('DOMContentLoaded', function () {
  const popularCards = document.getElementById('popular-cards');
  const makananCards = document.getElementById('makanan-cards');
  const minumanCards = document.getElementById('minuman-cards');

  fetch('http://127.0.0.1:3000/api/menu')
    .then((response) => response.json())
    .then((data) => {
      // Menampilkan kategori Hidangan Terbaik
      data
        .filter((item) => item.isBest)
        .forEach((item) => {
          const card = createCard(item);
          popularCards.appendChild(card);
        });

      // Menampilkan kategori Makanan
      data
        .filter((item) => item.category === 'Makanan')
        .forEach((item) => {
          const card = createCard(item);
          makananCards.appendChild(card);
        });

      // Menampilkan kategori Minuman
      data
        .filter((item) => item.category === 'Minuman')
        .forEach((item) => {
          const card = createCard(item);
          minumanCards.appendChild(card);
        });
    })
    .catch((error) => console.error('Error fetching menu data:', error));
});

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

  return card;
}
