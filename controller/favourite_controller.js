const favourite_model= require('../model/favourite_model');

exports.addFavourite = async (req, res) => {
  try{
    const _id=req.params.id;
    const favourite= await favourite_model.findOne(_id);

    if(favourite){
      favourite.productIds.push(req.body.productId);
      favourite.save();
    }else{
      await favourite_model.create({
        _id:_id,
        productIds:req.body.productId
      })
      res.status(201).send({
        success: true,
        message: `${req.body}\n product is successfully added`,
        data: [],
      });
    }
  }catch(err){
    res.status(404).json({ success: false, message: "Something went worng !", data: err });
  }
}