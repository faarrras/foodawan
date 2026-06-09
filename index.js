const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Supaya server bisa membaca data yang dikirim dari form input HTML
app.use(express.urlencoded({ extended: true }));

// Memberitahu Express kalau kita pakai EJS untuk tampilannya
app.set('view engine', 'ejs');

// Data Menu Makanan (Kita tulis manual di sini)
const menu = [
  { id: 1, name: 'Ayam Goreng Awan', price: 25000 },
  { id: 2, name: 'Mie Goreng Nimbus', price: 18000 },
  { id: 3, name: 'Es Teh Sederhana', price: 5000 }
];

// Tempat menyimpan pesanan sementara di memori server (RAM)
const orders = [];

// 1. ROUTE HALAMAN UTAMA: Menampilkan Menu & Form Pesanan
app.get('/', (req, res) => {
  res.render('index', { menu, orders });
});

// 2. ROUTE PROSES PESANAN: Menerima data saat tombol "Kirim Pesanan" diklik
app.post('/order', (req, res) => {
  const { customerName, foodItem, quantity } = req.body;
  
  // Memasukkan data pesanan baru ke dalam list orders
  orders.push({
    customerName,
    foodItem,
    quantity: parseInt(quantity)
  });

  // Setelah sukses, pindah ke halaman sukses
  res.redirect('/success');
});

// 3. ROUTE HALAMAN SUKSES
app.get('/success', (req, res) => {
  res.render('success');
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Aplikasi foodAwan berjalan di http://localhost:${PORT}`);
});