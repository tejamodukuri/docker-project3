var coremodel = {};
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var mongooseIncrement = require('mongoose-increment');
var increment = mongooseIncrement(mongoose);

coremodel.addIncrement = function(collection, schema, field, startVal, incVal, unique){
    schema.plugin(increment, {
        start: startVal,
        modelName: collection,
        fieldName: field,
        unique: unique,
        increment: incVal,
    });
}

module.exports = coremodel;