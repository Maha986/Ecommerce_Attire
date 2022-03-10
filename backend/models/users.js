const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    user_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    shippingAddress:{
        type: String,
        required: true
    },
    billingAddress:{
        type: String,
        required: true
    },
    phoneNo:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: 'user'
    }
});

module.exports = mongoose.model('users',UserSchema); 