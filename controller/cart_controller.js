const cart_model = require("../model/cart_model");

exports.create_cart = async (req, res) => {
  try{
    const data = {
      productId: req.body.productId,
      productQuantity: req.body.productQuantity,
    };
    const cart = new cart_model({
      products:data
    });

    await cart.save();
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
    console.log(cart);
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
      cart.products.push(data);
      await cart.save();
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
        id: req.body.id,
      };
      // Use findOneAndUpdate() to find the cart document with the given _id and update it
      const updatedCart = await cart_model.findOneAndUpdate(
        { _id: cart }, // Filter criteria to find the cart document to update
        { $pull: { products: { _id:data.id } } }, // Update operation to remove item from products array
        { new: true } // Options to return the updated document instead of the original document
      );
      await updatedCart.save();
      return res.status(200).json({
        success: true,
        message: "Successfully removed from cart",
        data: updatedCart
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
}