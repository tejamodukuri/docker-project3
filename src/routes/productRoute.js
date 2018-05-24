var express = require('express');
var productRouter = express.Router();
var productController = require('../controllers/productController.js');
var productModel = require('../models/productModel');


productRouter.get('/catalogcount', function(req, res, next) {
    productController.getTotalProductsCount(req,res);
});

productRouter.post('/catalog', function(req, res, next) {
    productController.getAllProducts(req,res);
});

productRouter.get('/:productid', function(req, res, next) {
    productController.getProduct(req,res);
});

productRouter.post('/create', function(req, res, next) {
    productController.createProduct(req,res);
});

productRouter.patch('/update', function(req, res, next) {
    productController.updateProduct(req,res);
});

module.exports = productRouter;