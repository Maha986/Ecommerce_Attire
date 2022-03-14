const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    product_ids: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products"
        },
        quantity: {
            type: Number,
            default: undefined
        },
        date: {
            type: String
        }
    }],
    total: {
        type: Number
    },
    total_items: {
        type: Number
    }

});

module.exports = mongoose.model('cart', CartSchema);