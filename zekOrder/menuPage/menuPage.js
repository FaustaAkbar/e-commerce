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
          e.preventDefault();
          let targetId = this.getAttribute('href').substring(1);
   
          if (targetId === '') {
              targetId = 'home';
          }

          const targetSection = document.getElementById(targetId);
     
          window.scrollTo({
              top: targetSection ? targetSection.offsetTop - 70 : 0,
              behavior: 'smooth',
          });
      
          navLinks.forEach((nav) => nav.classList.remove('active'));
          this.classList.add('active');
      });
  });
});

// Data Makanan populer
const DataPopuler = [
  { name: "Nasi Goreng", rating: "4.5/5", price: "Rp 30.000", image: "../images/Food.png" },
  { name: "Rendang Padang", rating: "4.7/5", price: "Rp 45.000", image: "../images/Food.png" },
  { name: "Gado-Gado", rating: "4.8/5", price: "Rp 25.000", image: "../images/Food.png" },
  { name: "Bakso Malang", rating: "4.5/5", price: "Rp 35.000", image: "../images/Food.png" },
  { name: "Pisang Goreng", rating: "4.7/5", price: "Rp 20.000", image: "../images/Food.png" },
  { name: "Ayam Penyet", rating: "4.8/5", price: "Rp 40.000", image: "../images/Food.png" },
  { name: "Soto Ayam", rating: "4.5/5", price: "Rp 30.000", image: "../images/Food.png" },
  { name: "Nasi Uduk", rating: "4.7/5", price: "Rp 25.000", image: "../images/Food.png" },
  { name: "Mie Goreng", rating: "4.8/5", price: "Rp 30.000", image: "../images/Food.png" },
  { name: "Kwetiau Goreng", rating: "4.5/5", price: "Rp 35.000", image: "../images/Food.png" },
  { name: "Kerupuk Udang", rating: "4.7/5", price: "Rp 10.000", image: "../images/Food.png" },
];

// Data Menu Makanan
const DataMakanan = [
  { name: "Risoles", price: "Rp 15.000", rating: "4.5/5", image: "../images/Food.png" },
  { name: "Kue Cubit", price: "Rp 10.000", rating: "4.7/5", image: "../images/Food.png" },
  { name: "Tahu Tempe", price: "Rp 20.000", rating: "4.5/5", image: "../images/Food.png" },
  { name: "Sempol Ayam", price: "Rp 15.000", rating: "4.7/5", image: "../images/Food.png" },
  { name: "Martabak Manis", price: "Rp 12.000", rating: "4.5/5", image: "../images/Food.png" },
  { name: "Cireng", price: "Rp 10.000", rating: "4.7/5", image: "../images/Food.png" },
  { name: "Pisang Rebus", price: "Rp 8.000", rating: "4.5/5", image: "../images/Food.png" },
  { name: "Jagung Bakar", price: "Rp 15.000", rating: "4.7/5", image: "../images/Food.png" },
  { name: "Kue Lapis", price: "Rp 20.000", rating: "4.5/5", image: "../images/Food.png" },
  { name: "Serabi", price: "Rp 12.000", rating: "4.7/5", image: "../images/Food.png" },
];

// Data Menu Minuman
const DataMinuman = [
  { name: "Es Teh Manis", price: "Rp 5.000", rating: "4.8/5", image: "../images/Food.png" },
  { name: "Jus Alpukat", price: "Rp 15.000", rating: "4.9/5", image: "../images/Food.png" },
  { name: "Kopi Tubruk", price: "Rp 10.000", rating: "4.8/5", image: "../images/Food.png" },
  { name: "Es Kelapa Muda", price: "Rp 12.000", rating: "4.9/5", image: "../images/Food.png" },
  { name: "Wedang Jahe", price: "Rp 8.000", rating: "4.8/5", image: "../images/Food.png" },
  { name: "Teh Tarik", price: "Rp 10.000", rating: "4.9/5", image: "../images/Food.png" },
  { name: "Es Jeruk", price: "Rp 7.000", rating: "4.8/5", image: "../images/Food.png" },
  { name: "Susu Cokelat", price: "Rp 10.000", rating: "4.9/5", image: "../images/Food.png" },
  { name: "Es Cendol", price: "Rp 8.000", rating: "4.8/5", image: "../images/Food.png" },
  { name: "Jus Mangga", price: "Rp 15.000", rating: "4.9/5", image: "../images/Food.png" },
];


// Fungsi build cards
function renderCards(data, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  data.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="dish-image" />
          <h3>${item.name}</h3>
          <p><span class="rating">⭐ ${item.rating}</span></p>
          <p class="price">${item.price}</p>
          <div class="quantity-control">
              <button class="quantity-btn decrease">-</button>
              <span class="quantity">0</span>
              <button class="quantity-btn increase">+</button>
          </div>
          <button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
      `;
      container.appendChild(card);

      // Fungsi jumlah Makanan
      const quantityDisplay = card.querySelector(".quantity");
      let quantity = 0; 
      const decreaseButton = card.querySelector(".decrease");
      const increaseButton = card.querySelector(".increase");
      decreaseButton.addEventListener("click", () => {
          if (quantity > 0) { 
              quantity--;
              quantityDisplay.textContent = quantity; 
          }
      });
      increaseButton.addEventListener("click", () => {
          quantity++;
          quantityDisplay.textContent = quantity; 
      });

      // fungsi add to card
      const addToCartButton = card.querySelector(".add-to-cart");
      addToCartButton.addEventListener("click", () => {
          if (quantity > 0) { // Only redirect if quantity is greater than 0
              // Redirect to checkout page with selected item data
              window.location.href = `../checkoutPage/checkoutPage.html?item=${item.name}&quantity=${quantity}&price=${item.price}`;
          } else {
              alert("Please select at least one item before adding to cart.");
          }
      });
  });
}

// Render card setiap kategori
window.addEventListener("DOMContentLoaded", () => {
  renderCards(DataPopuler, "dish-cards");
  renderCards(DataMakanan, "snacks-cards");
  renderCards(DataMinuman, "regular-cards");
});

// Fungsi drag scroll
const dishCardsContainer = document.getElementById("dish-cards");

let isDown = false;
let startX;
let scrollLeft;

dishCardsContainer.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - dishCardsContainer.offsetLeft;
  scrollLeft = dishCardsContainer.scrollLeft;
  dishCardsContainer.style.cursor = 'grabbing'; 
});

dishCardsContainer.addEventListener("mouseleave", () => {
  isDown = false;
  dishCardsContainer.style.cursor = 'grab'; 
});

dishCardsContainer.addEventListener("mouseup", () => {
  isDown = false;
  dishCardsContainer.style.cursor = 'grab'; 
});

dishCardsContainer.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - dishCardsContainer.offsetLeft;
  const walk = (x - startX) * 3;
  dishCardsContainer.scrollLeft = scrollLeft - walk;
});

// Fungsi untuk mencari kartu yang cocok dengan input pencarian
function filterCards(searchTerm) {
  // Gabungkan semua data menjadi satu array
  const allData = [...DataPopuler, ...DataMakanan, ...DataMinuman];
  
  // Filter data berdasarkan nama yang mengandung teks pencarian
  const filteredData = allData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Jika tidak ada hasil, tampilkan pesan
  if (filteredData.length === 0) {
    document.getElementById("dish-cards").innerHTML = "<p>Tidak ada hasil ditemukan.</p>";
    document.getElementById("snacks-cards").innerHTML = "";
    document.getElementById("regular-cards").innerHTML = "";
  } else {
    // Render ulang kartu di semua kategori
    document.getElementById("deskripsi").innerHTML = 'Hasil Pencarian';
    renderCards(filteredData, "dish-cards");
    document.getElementById("snacks-cards").innerHTML = "";
    document.getElementById("regular-cards").innerHTML = "";
  }
}

// Event listener untuk input pencarian
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", function () {
  const searchTerm = this.value.trim(); // Ambil input user
  if (searchTerm) {
    filterCards(searchTerm); // Panggil fungsi filterCards
  } else {
    // Jika kotak pencarian kosong, render ulang semua kartu
    document.getElementById("deskripsi").innerHTML = 'Hidangan <span class="highlight">Terbaik</span> Kami';
    renderCards(DataPopuler, "dish-cards");
    renderCards(DataMakanan, "snacks-cards");
    renderCards(DataMinuman, "regular-cards");
  }
});
