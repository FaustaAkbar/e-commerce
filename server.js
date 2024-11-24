const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

let menuCache = null; // Variabel untuk menyimpan data menu yang sudah di-cache
const menuFilePath = path.join(__dirname, 'zekOrder', 'assets', 'ZekMenu.json');

// Menyajikan file statis dari folder 'zekOrder' dan 'assets/images'
app.use(cors());
app.use(express.static(path.join(__dirname, 'zekOrder')));
app.use('/images', express.static(path.join(__dirname, 'zekOrder', 'assets', 'images')));

// Endpoint untuk mengirimkan halaman utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'zekOrder', 'index.html'));
});

// Fungsi untuk membaca dan meng-cache file menu
const readMenuFile = () => {
  fs.readFile(menuFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }

    try {
      menuCache = JSON.parse(data); // Menyimpan data JSON ke dalam cache
      console.log('Menu data successfully loaded into cache.');
    } catch (parseError) {
      console.error('Error parsing JSON data:', parseError);
    }
  });
};

// Endpoint untuk mengambil menu
app.get('/api/menu', (req, res) => {
  if (menuCache) {
    // Jika menu sudah ada di cache, kirimkan langsung
    res.json(menuCache);
  } else {
    // Jika belum ada di cache, baca file menu dan kirimkan data
    console.log('Menu data is not in cache, reading from file...');
    readMenuFile();
    res.json({ error: 'Menu is loading, please try again shortly.' });
  }
});

// Membaca file menu pertama kali saat server dijalankan
readMenuFile();

// Menggunakan fs.watch untuk memonitor perubahan file
fs.watch(menuFilePath, (eventType, filename) => {
  if (eventType === 'change') {
    console.log(`${filename} has been updated. Reloading menu data...`);
    readMenuFile(); // Memperbarui cache dengan data terbaru
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
