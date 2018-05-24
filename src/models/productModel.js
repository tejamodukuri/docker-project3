var mongoose = require('mongoose');
var schema = mongoose.Schema;
const collection = 'rdproductcatalogs';
var coremodel = require('./coreModel');

var schemaObject = {
    productId: Number,
    productName: String,
    vendorCode: String,
    vendorName: String,
    minimumOrderQuantity: Number,
    maximumOrderQuantity: Number,
    orderQuantity: Number,
    unitOfMeasure: String,
    unitPrice: schema.Types.Decimal128,
    weight: Number,
    individualPkgLength: Number,
    individualPkgWidth: Number,
    individualPkgHeight: Number,
    palletLength: Number,
    palletWidth: Number,
    palletHeight: Number,
    productImages: Array({
        title: String,
        size: String,
        url: String,
        altname: String
    }),
    ageRestrictionFlag: Boolean,
    ageRestriction: Number,
    geoRestrictionFlag: Boolean,
    lastUpdateDate: Date,
    lastUpdateBy: String,
    creationDate: Date,
    createdBy: String
};



var mappedObject = {
    productId: 'reference_no',
    productName: 'title',
    vendorCode: 'code',
    vendorName: 'code_name',
    minimumOrderQuantity: 'min_quantity',
    maximumOrderQuantity: 'max_quantity',
    orderQuantity: 'quantity',
    unitOfMeasure: 'unit',
    unitPrice: 'price',
    weight: 'weight',
    individualPkgLength: 'length',
    individualPkgWidth: 'width',
    individualPkgHeight: 'height',
    palletLength: 'length1',
    palletWidth: 'width1',
    palletHeight: 'height1',
    productImages: 'images',
    ageRestrictionFlag: 'agef',
    ageRestriction: 'age',
    geoRestrictionFlag: 'geof',
    lastUpdateDate: 'updated_at',
    lastUpdateBy: 'update_by',
    creationDate: 'created_at',
    createdBy: 'created_by'
};

var productSchema = new schema(schemaObject);
coremodel.addIncrement(collection, productSchema, 'productId', 1000, 1, true);

var productModel = mongoose.model(collection, productSchema);
module.exports.dataModel = productModel;
module.exports.dataObject = schemaObject;
module.exports.mappedObject = mappedObject;
