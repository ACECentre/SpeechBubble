var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var extend = require('mongoose-schema-extend');
var ProductSchema = require('../product.model').Schema;
var Schema = mongoose.Schema;

var ProductAccessorySchema = ProductSchema.extend({

}, { collection: 'products' });

module.exports = mongoose.model('ProductAccessory', ProductAccessorySchema);
