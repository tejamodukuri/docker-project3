var mongoose = require('mongoose');
var schema = mongoose.Schema;
var coremodel = require('./coreModel');
const collection = 'rdcart';

var schemaObject = {
    cartId: Number,
    userId: Number,
    productId: Number,
    productName: String,
    vendorCode: String, 
    vendorName: String,
    productSize: Number,
    productQuantity: Number,
    productUnitPrice: schema.Types.Decimal128,
    productNetPrice: schema.Types.Decimal128,
    creationDate: Date,
    lastUpdateDate: Date,
    productImage: String
};

var cartSchema = new schema(schemaObject);
coremodel.addIncrement(collection, cartSchema, 'cartId', 1000, 1, true);


var cartModel = mongoose.model(collection, cartSchema);
module.exports.dataModel = cartModel;
module.exports.dataObject = schemaObject;