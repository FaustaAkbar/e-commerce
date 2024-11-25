const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Koneksi ke MongoDB
mongoose
  .connect('mongodb://localhost:27017/zekMenu', {})
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.error(err));

const menuSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  isBest: { type: Boolean, required: true },
});
// Model Menu
const Menu = mongoose.model('Menu', menuSchema);

const cartSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const Cart = mongoose.model('Cart', cartSchema);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'zekOrder')));
app.use('/images', express.static(path.join(__dirname, 'zekOrder', 'assets', 'images')));

// Rute Frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'zekOrder', 'index.html'));
});

// API Endpoint
app.get('/api/menu', async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

app.post('/api/menu', async (req, res) => {
  try {
    const newMenu = new Menu(req.body);
    const savedMenu = await newMenu.save();
    res.status(201).json(savedMenu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving data' });
  }
});

app.post('/api/cart/add', async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const menuItem = await Cart.findById(itemId);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    const cartItem = new Cart({ itemId: menuItem._id, itemName: menuItem.itemName, price: menuItem.price, quantity: quantity });
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding item to cart' });
  }
});

app.get('/api/cart', async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching cart items' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
