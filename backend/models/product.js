const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true});

module.exports = mongoose.model('Product', productSchema, 'products');