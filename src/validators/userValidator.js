var userValidator = {};
inArray = require('in-array');
var userObject = require('../models/userModel').dataObject;
var appHelper = require('../helpers/appHelper');
var userArray = [];

for (var objKey in userObject) {
    if(!inArray(userArray, objKey)){
        userArray.push(objKey);
    }
}

userValidator.validateRequest = function (userObj) {
    return appHelper.validRequestParams(userArray, userObj);
}

module.exports = userValidator;