const express= require('express');
const router= express.Router();

const controller =require('../controller/favourite_controller')


router.post('/:id/add_fav',controller.addFavourite);

module.exports=router;