const { Schema, default: mongoose } = require("mongoose");

const cartProductSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
},{timestamps: true});

const cartSchema = new Schema({
  userId:{
    type: Schema.Types.ObjectId,
    required: true,
  },
  products:[cartProductSchema]
},{timestamp : true});




module.exports = mongoose.model("cart", cartSchema);