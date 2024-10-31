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

  // Tambahkan perilaku scroll halus untuk link navbar
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      let targetId = this.getAttribute('href').substring(1);

      // Jika target adalah "Best" yang kosong, arahkan ke atas halaman
      if (targetId === '') {
        targetId = 'home';
      }

      const targetSection = document.getElementById(targetId);

      // Gulir ke section target dengan smooth scrolling
      window.scrollTo({
        top: targetSection ? targetSection.offsetTop - 70 : 0, // offset jika ada atau ke atas halaman jika home
        behavior: 'smooth',
      });

      // Update class active pada link navbar
      navLinks.forEach((nav) => nav.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
