var productController = {};
var productModel = require('../models/productModel').dataModel;
var productMappedObject = require('../models/productModel').mappedObject;
var productValidator = require('../validators/productValidator');
var appHelper = require('../helpers/appHelper');

productController.getTotalProductsCount = function(req,res){
    productModel.count(callback = function (error, data) {
        if (error) {
            return res.send({
                status: false,
                message: 'failed : ' + error.message
            });
        }

        return res.send({
            status: true,
            message: 'success',
            productsCount: data
        });
    
    });
}



productController.getAllProducts = function (req, res) {
    var limit= req.body.limit;
    var offset= req.body.offset;
    
    productModel.find(callback = function (error, data) {
        if (error) {
            return res.send({
                status: false,
                message: 'failed : ' + error.message
            });
        }

        return res.send({
            status: true,
            message: 'success',
            products: data
        });
    var limit= req.params.limit;
    }).skip(offset).limit(limit);
}

productController.createProduct = function (req, res) {
    var productInfo = req.body;

    productInfo.creationDate = appHelper.utcTimestamp();
    productInfo.lastUpdateDate = appHelper.utcTimestamp();

    if (!productValidator.validateRequest(productInfo)) {
        return res.send({
            status: false,
            message: 'failed'
        });
    }

    var productObject = new productModel(productInfo);
    productObject.save(callback = function (error, data) {
        if (error) {
            return res.send({
                status: false,
                message: 'failed : ' + error.message
            });
        }

        return res.send({
            status: true,
            message: 'success'
        });
    });
}

productController.updateProduct = function (req, res) {
    var productInfo = req.body.data;
    var productId = req.body.productId
    productInfo.lastUpdateDate = appHelper.utcTimestamp();

    if (!productValidator.validateRequest(productInfo) || productId == "undefined") {
        return res.send({
            status: false,
            message: 'failed'
        });
    }

    productModel.findOneAndUpdate({ productId: productId }, productInfo, callback = function (error, data) {
        if (error) {
            return res.send({
                status: false,
                message: 'failed : ' + error.message
            });
        }

        return res.send({
            status: data != null ? true : false,
            message: data != null ? 'success' : 'failed to process update',
        });
    });

}

productController.getProduct = function (req, res) {
    var productId = req.params.productid;
    productModel.find({ 'productId': productId }, callback = function (error, data) {

        if (error) {
            return res.send({
                status: false,
                message: 'failed : ' + error.message
            });
        }

        return res.send({
            status: true,
            message: 'success',
            products: data.length != 0 ? data[0] : {}
        });
    });
}

module.exports = productController;