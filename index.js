const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Supaya server bisa membaca data dari form input HTML
app.use(express.urlencoded({ extended: true }));

// Setting EJS normal (karena index.js sudah di luar bersama folder views)
app.set('view engine', 'ejs');

// Data Menu Makanan
const menu = [
  { id: 1, name: 'Ayam Goreng Awan', price: 25000 },
  { id: 2, name: 'Mie Goreng Nimbus', price: 18000 },
  { id: 3, name: 'Es Teh Sederhana', price: 5000 }
];

// Tempat menyimpan pesanan sementara di memori server (RAM)
const orders = [];

// 1. ROUTE HALAMAN UTAMA
app.get('/', (req, res) => {
  res.render('index', { menu, orders });
});

// 2. ROUTE PROSES PESANAN
app.post('/order', (req, res) => {
  const { customerName, foodItem, quantity } = req.body;
  
  orders.push({
    customerName,
    foodItem,
    quantity: parseInt(quantity)
  });

  res.redirect('/success');
});

// 3. ROUTE HALAMAN SUKSES
app.get('/success', (req, res) => {
  res.render('success');
});

// Jalankan server jika dijalankan secara lokal (di laptop sendiri)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Aplikasi foodAwan berjalan di http://localhost:${PORT}`);
  });
}

// WAJIB UNTUK VERCEL: Mengekspor aplikasi Express
module.exports = app;