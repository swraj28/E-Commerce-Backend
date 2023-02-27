const express = require('express');
const router = express.Router();

const controller= require("../controller/products_controller")

router.post('/create',controller.createOneProduct);
router.get('/get-all',controller.get_all_products);
router.get('/get-one/:id',controller.getOneProduct);
router.post('/update-one/:id',controller.updateOneProduct);
router.delete('/delete-one/:id',controller.delete_product);

module.exports= router;