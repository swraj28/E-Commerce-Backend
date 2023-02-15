const express = require('express');
const router= express.Router();

const controller = require("../controller/cart_controller");

router.post("/create",controller.create_cart);
router.get("/:id/get_cart",controller.get_cart);

module.exports= router;