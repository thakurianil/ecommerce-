const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
    maxLength: [100, 'Product name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
    min: [0, 'Price cannot be negative']
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description']
  },
  image: {
    type: String,
    required: [true, 'Please provide a product image']
  },
  category: {
    type: String,
    required: [true, 'Please provide a product category'],
    enum: ['electronics', 'clothing', 'books', 'home', 'sports']
  },
  countInStock: {
    type: Number,
    required: [true, 'Please provide count in stock'],
    min: [0, 'Count in stock cannot be negative']
  },
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  brand: {
    type: String,
    required: [true, 'Please provide a product brand']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema); 