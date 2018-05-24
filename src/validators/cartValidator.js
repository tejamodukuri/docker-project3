var cartValidator = {};
inArray = require('in-array');
var cartObject = require('../models/cartModel').dataObject;
var appHelper = require('../helpers/appHelper');
var cartArray = [];

for (var objKey in cartObject) {
    if(!inArray(cartArray, objKey)){
        cartArray.push(objKey);
    }
}

cartValidator.validateRequest = function (userObj) {
    return appHelper.validRequestParams(cartArray, userObj);
}

module.exports = cartValidator;