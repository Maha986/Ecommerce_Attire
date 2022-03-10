const mongoose = require("mongoose");
const {Schema} = mongoose;

const ProductSchema = new Schema({
    product_name:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    fabric:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    },
    date:{
        type: String,
        default: Date()
    },
    description:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('products',ProductSchema);