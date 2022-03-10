const express = require('express');
const {body, validationMessage} = require('express-validator');
const route =  express.Router();
const Product = require('../models/products');

//add product
route.post('/addProduct',
async (req,res)=>{

    try{
        const {product_name,url,fabric,price,stock,category,color,date,description} = req.body;
        //find product name
        let product = await Product.findOne({product_name: product_name});
        if(product)
        {
            return res.status(400).json({message:'Product with name already exists'});
        }
    
        product = await Product.create({
            product_name: product_name,
            url: url,
            fabric: fabric,
            price: price,
            stock: stock,
            category: category,
            color: color,
            date: date,
            description: description
        })
    
        res.json({message: product});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
    
})


//get product
route.get('/getProducts', async(req,res)=>{
    try{
        const products =await Product.find({});
        res.json(products);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = route;