const express = require('express');
const router = express.Router();

const controller= require("../controller/products_controller")

router.post('/create',controller.createOneProduct);
router.get('/get-all',controller.get_all_products);
router.get('/get-one/:id',controller.getOneProduct);

module.exports= router;