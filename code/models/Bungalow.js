const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bungalowSchema = new Schema({
  address: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    enum: ['detached', 'semi-detached', 'terraced', 'cottage', 'villa'],
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'rented', 'under maintenance'], 
    required: true,
    default: 'available',
  },
  price: {
    type: Number,
    required: true, 
    min: 0,
  },
  images: [
    {
      url: String, 
    },
  ],
  location: {
    type: {
      type: String,
      enum: ['Point'], 
      required: true,
    },
    coordinates: {
      type: [Number], 
      required: true,
    },
  },
});

module.exports = mongoose.model('Bungalow', bungalowSchema);
