// Fungsi untuk menampilkan atau menyembunyikan kotak pencarian
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

function toggleProfileDrawer() {
  const drawer = document.getElementById('profile-drawer');
  drawer.style.display = drawer.style.display === 'none' ? 'block' : 'none';
}

function logout() {
  // Tambahkan logika untuk menghapus sesi atau token jika diperlukan
  window.location.href = '../loginPage/login.html';
}

// Menyembunyikan drawer ketika mengklik di luar area drawer
window.addEventListener('click', function (event) {
  const drawer = document.getElementById('profile-drawer');
  const profilePic = document.querySelector('.profile-pic');

  if (drawer.style.display === 'block' && !drawer.contains(event.target) && !profilePic.contains(event.target)) {
    drawer.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const popularCards = document.getElementById('popular-cards');

  // Ambil data dari API
  fetch('http://127.0.0.1:3000/api/menu')
    .then((response) => response.json())
    .then((data) => {
      // Filter untuk 3 menu terbaik dari kategori Makanan
      const bestMakanan = data.filter((item) => item.isBest && item.category === 'Makanan').slice(0, 3); // Ambil maksimal 3 item

      // Tampilkan menu ke dalam card
      bestMakanan.forEach((item) => {
        const card = createCard(item);
        popularCards.appendChild(card);
      });
    })
    .catch((error) => console.error('Error fetching menu data:', error));
});

function createCard(item) {
  const card = document.createElement('div');
  card.classList.add('dish-item');

  const imageUrl = item.imageUrl || '/assets/default.png'; // Gambar default jika tidak ada

  card.innerHTML = `
    <div class="dish-image-wrapper">
      <img src="${imageUrl}" alt="${item.itemName}">
    </div>
    <div class="dish-name">${item.itemName}</div>
    <a href="/menuPage/menuPage.html" class="order-link">Order Now</a>

  `;

  return card;
}
