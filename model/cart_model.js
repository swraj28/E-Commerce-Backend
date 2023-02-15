const { Schema, default: mongoose } = require("mongoose");

const cartProductSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: String,
    required: true,
  },
},{timestamp: true});

const cartSchema = new Schema({
  products: [cartProductSchema],
},{timestamp: true});

module.exports = mongoose.model("cart", cartSchema);