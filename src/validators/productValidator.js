var productValidator = {};
inArray = require('in-array');
var productObject = require('../models/productModel').dataObject;
var appHelper = require('../helpers/appHelper');
var productArray = [];

for (var objKey in productObject) {
    if(!inArray(productArray, objKey)){
        productArray.push(objKey);
    }
}

productValidator.validateRequest = function (productObj) {
    return appHelper.validRequestParams(productArray, productObj);
}

module.exports = productValidator;