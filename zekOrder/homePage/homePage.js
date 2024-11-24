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
