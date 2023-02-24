const products_model= require('../model/products_model')
const category_model= require('../model/category_model')
const sub_category_model= require('../model/sub_category_model')
const flash_sale_model= require('../model/flash_sale_model');


exports.get_all_products= async(req,res)=>{
  try{
    const products= await products_model.find();
    res.json({
      success: true,
      message: "Successfully found products",
      data: products,
    });
  }catch(err){
    res.status(404).json({ success: false, message: "Something went worng !", data: err});
  }
};

exports.getOneProduct = async (req, res) => {
  try {
    const _id = (req.params.id);
    const product = await products_model.findOne({ _id });
    res.status(200).send({
      success: true,
      message: 'Successfully found product',
      data: product,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Something went worng !", data: err});
  }
};

exports.createOneProduct = async (req, res) => {
  try {
    const response = await products_model.create(req.body);


    if (req.body.flashsale == "true") {
      const teo = await flash_sale_model.find();
      if (teo[0]) {
        teo[0].productIds.push(response._id);
        teo[0].save();
      } else {
        await flash_sale_model.create({
          productIds: response._id
        });
      }
    }


    var subCategory = await sub_category_model.findOne({
      subCategory: req.body.subCategory,
    });
    if (subCategory) {
      subCategory.productid.push(response._id);
      subCategory.save();
    }else {
      subCategory = await sub_category_model.create({
        productid: response._id,
        subCategory: response.subCategory,
      });
    }


    const category = await category_model.findOne({
      category: req.body.category,
    });
    if (category) {
      const subCategoryItem = category.subCategoryIds.includes(subCategory.id);
      if (!subCategoryItem) {
        category.subCategoryIds.push(subCategory.id);
        category.save();
      }
    } else {
      await category_model.create({
        subCategoryIds: subCategory._id,
        category: response.category,
      });
    }


    res.status(201).send({
      success: true,
      message: 'Product created successfully',
      data: response
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Something went worng !", data: error.errors });
  }
};