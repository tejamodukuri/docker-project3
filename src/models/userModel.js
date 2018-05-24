var mongoose = require('mongoose');
var schema = mongoose.Schema;
var coremodel = require('./coreModel');
const collection = 'rduseraccounts';

var schemaObject = {
    userId: Number,
    emailAddress: String,
    password: String,
    firstName: String,
    lastName: String,
    name: String,
    dateOfBirth: Date,
    accountNumber: String,
    companyName: String,
    officeAddress1: String,
    officeAddress2: String,
    officeState: String,
    officeCity: String,
    officeZipCode: Number,
    officeCountry: String,
    shippingAddress1: String,
    shippingAddress2: String,
    shippingCity: String,
    shippingState: String,
    shippingZipCode: Number,
    shippingCountry: String,
    phoneNumber: Number,
    zervPublicKey: String,
    shippingAddressValidationFlag: Boolean,
    elegibilityForRestrictedItemsFlag: Boolean,
    lastUpdateDate: Date,
    lastUpdatedBy: String,
    creationDate: Date,
    createdBy: String
};

var userSchema = new schema(schemaObject);
coremodel.addIncrement(collection, userSchema, 'userId', 1000, 1, true);

var userModel = mongoose.model(collection, userSchema);
module.exports.dataModel = userModel;
module.exports.dataObject = schemaObject;