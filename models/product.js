const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//properties that we want the products to have...
const productSchema = new Schema({
    title: { type: String, required: true},
    price: { type: String, rquired: true},
    description: { type: String, required: true},
    type: { type: String, required: true},
    url: { type: String, required: true}
});

//create model to go around schema
const Product = mongoose.model('Product', productSchema) //should add this as a collection

module.exports = Product;