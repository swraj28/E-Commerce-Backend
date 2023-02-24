const { Schema, mongo, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart:{
    type: Array,
    default: []
  }
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);