const { Schema, mongo, default: mongoose } = require("mongoose");

const productsSchema = new Schema({
  product: {
    type: String,
    required: true,
  },
  actualPrice: {
    type: Number,
    required: true,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  offInPercentage: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  flashsale: {
    type: Boolean,
    required: true,
  },
  image: {
    type: Array,
    required: false,
  },
  size: {
    type: Array,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true
  },
},{timestamp:true});

module.exports = mongoose.model("Products", productsSchema);