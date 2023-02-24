const express= require('express');
const app= express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const favouriteRoutes = require("./routes/favourite");
const productsRoutes= require("./routes/products_routes")

dotenv.config();

mongoose.set('strictQuery', true);

// Establishing the Database Connection 
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.get('/',(req,res)=>{
  res.send('<h1>Welcome to HomePage</h1>')
})

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/favourite", favouriteRoutes);
app.use("/products", productsRoutes);


app.listen(8000, (err) => {
  if(err){
    console.log('Error While Loading the Server');
  }
  console.log("Backend server is running!");
});