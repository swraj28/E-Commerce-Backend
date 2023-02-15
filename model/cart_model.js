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
},{timestamps: true});

const cartSchema = new Schema({
  products: [cartProductSchema],
},{timestamps: true});

module.exports = mongoose.model("cart", cartSchema);