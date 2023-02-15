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