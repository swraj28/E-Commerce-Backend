const cart_model = require("../model/cart_model");
const user_model = require("../model/user_model");
const products_model = require("../model/products_model");

exports.create_cart = async (req, res) => {
  try{

    const data = {
      productId: req.body.productId,
      productQuantity: req.body.productQuantity,
    };

    const userId= req.body.userId;

    const user= await user_model.findOne({_id:userId});

    if(!user){
      return res.status(404).json({success:false,message:"User not found"});
    }

    const product = await products_model.findOne({_id:data.productId});

    if(!product){
      return res.status(404).json({success:false,message:"Product not found"});
    }

    const quantity = product.Quantity;

    if(quantity < data.productQuantity){
      return res.status(404).json({success:false,message:"Product Quantity is not enough"});
    }

    const cart = new cart_model({
      userId: userId,
      products:data
    });

    await cart.save();

    const newQuantity= quantity - data.productQuantity;
    product.Quantity = newQuantity;
    await product.save();

    return res.status(200).json({
      success: true,
      message: "Successfully created the cart",
      data: cart
    });
    
  }catch(err){
    res.status(404).json({ success: false, message: "Something went worng!", data: err });
  }
};

exports.get_cart = async (req, res) => {
  try{
    const _id=(req.params.id);
    const cart = await cart_model.findOne({_id});
    if(cart){
      return res.status(200).json({
        success: true,
        message: "Successfully found the cart",
        data: cart
      })
    }else{
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      })
    }
  }catch(err){
    return res.status(404).json({ success: false, message: "Something went worng !", data: err });
  }
};

exports.add_to_cart = async (req, res) => {
  try{

    const _id=(req.params.id);
    const cart = await cart_model.findOne({_id});

    if(cart){

      const data = {
        productId: req.body.productId,
        productQuantity: req.body.productQuantity,
      };

      const product = await products_model.findOne({_id:data.productId});

      if(!product){
        return res.status(404).json({success:false,message:"Product not found"});
      }
  
      const quantity = parseInt(product.Quantity);
  
      if(quantity < parseInt(data.productQuantity)){
        return res.status(404).json({success:false,message:"Product Quantity is not enough"});
      }

      const productIndex = cart.products.findIndex((product) => product.productId == data.productId);

      if(productIndex !== -1){
        const existing_product = cart.products[productIndex];
        existing_product.productQuantity = parseInt(existing_product.productQuantity) + parseInt(data.productQuantity);
      }else{
        cart.products.push(data);
      }

      await cart.save();

      const newQuantity= parseInt(quantity) - parseInt(data.productQuantity);
      product.Quantity = newQuantity;
      await product.save();

      return res.status(200).json({
        success: true,
        message: "Successfully added to cart",
        data: cart
      })
    }else{
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      })
    }
  }catch(err){
    res.status(404).json({ success: false, message: "Something went worng!", data: err });
  }
};

exports.remove_from_cart = async (req, res) => {
  try{
    const _id=(req.params.id);
    const cart = await cart_model.findOne({_id});

    if(cart){
      const data = {
        productId: req.body.productId,
      };

      const product = await products_model.findOne({_id:data.productId});

      if(!product){
        return res.status(404).json({success:false,message:"Product not found"});
      }

      const quantity = parseInt(product.Quantity);

      const productIndex = cart.products.findIndex((product) => product.productId == data.productId);

      if(productIndex!== -1){
        const existing_product = cart.products[productIndex];
        const newQuantity= quantity + parseInt(existing_product.productQuantity);
        product.Quantity=newQuantity;
        await product.save();
      }

      if (productIndex === -1) {
        return res.status(404).json({ success: false, message: "Product not found in cart" });
      }

      cart.products.splice(productIndex, 1); // Remove the product from the cart

      await cart.save(); // Save the updated cart

      return res.json({ success: true, message: "Product deleted from cart", data: cart });
    }else{
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      })
    }
  }catch(err){
    res.status(404).json({ success: false, message: "Something went worng!", data: err });
  }
}