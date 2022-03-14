const express = require('express');
const Cart = require('../models/cart');
const route = express.Router();

route.post('/addToCart', async (req, res) => {
    const { user_id, total, total_items } = req.body;
    const { product_id, quantity, date } = req.body.product_ids[0];


    try {
        const updatedValue = {
            product_id: product_id,
            date: date,
            quantity: quantity,
        };
        const cart = await Cart.findOneAndUpdate({ user_id: user_id }, { total: total, total_items, total_items }, {
            new: true, upsert: true
        });
        cart.product_ids.push(updatedValue);
        cart.save();

        res.status(200).json(cart);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = route;