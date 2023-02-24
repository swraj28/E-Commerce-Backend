const { Schema, default: mongoose } = require("mongoose");

const categorySchema = new Schema({
  subCategoryIds: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Categories", categorySchema);