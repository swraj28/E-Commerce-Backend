const { Schema, default: mongoose } = require("mongoose");

const SubCategorySchema = new Schema({
  productid: {
    type: Array,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("subCategories", SubCategorySchema);