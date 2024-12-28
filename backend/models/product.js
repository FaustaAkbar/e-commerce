const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    isBest: { type: Boolean, default: false },
  },
  { collection: 'Menu' }
); // Menambahkan collection 'menu'

module.exports = mongoose.model('Product', productSchema);
