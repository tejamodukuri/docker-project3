var express = require('express');
var cartRouter = express.Router();
var cartController = require('../controllers/cartController');
var cartModel = require('../models/cartModel');


cartRouter.delete('/delete', function(req, res, next) {
    cartController.delete(req,res);
});

cartRouter.get('/:userid', function(req, res, next){
    cartController.retrive(req, res);
});

cartRouter.patch('/update', function(req, res, next){
    cartController.update(req, res);
});

cartRouter.post('/create', function(req, res, next) {
    cartController.create(req,res);
});

module.exports = cartRouter;