const express = require('express');
const router= express.Router();

const controller = require("../controller/cart_controller");

router.post("/create",controller.create_cart);
router.get("/:id/get_cart",controller.get_cart);
router.post("/:id/add_cart",controller.add_to_cart);
router.post("/:id/remove_cart",controller.remove_from_cart);

module.exports= router;