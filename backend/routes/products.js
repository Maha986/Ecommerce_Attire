const express = require('express');
const route = express.Router();
const Product = require('../models/products');
const fs = require("fs");

//add product
route.post('/addProduct',
    async (req, res) => {

        try {
            // const {formdata} = req.body;
            const { product_name, fabric, price, stock, category, color, date, description } = req.body;
            //find product name

            let product = await Product.findOne({ product_name: product_name });
            if (product) {
                return res.status(400).json({ type: "error", message: 'Product with this name already exists' });
            }

            var renamed = true;


            product = await Product.create({
                product_name: product_name,
                fabric: fabric,
                price: price,
                stock: stock,
                category: category,
                color: color,
                date: date,
                description: description
            })

            const url = product._id + ".png";

            //change image name in folder
            fs.rename("../backend/files/1.png", "../backend/files/" + url, async (err) => {
                if (err) {
                    await Product.findByIdAndDelete(product._id);
                return res.status(400).json({ type: "error", message: "Please upload image first." })
                }
                
                else
                {
                    product = await Product.updateOne(
                        { product_name: product_name },
                        { $set: { url: url } },
                        { upsert: true } // Make this update into an upsert
                    );
        
                    res.json({ type: "success", message: product });
                }
            })


            
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }

    })


//get product
route.get('/getProducts', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

//upload image
route.post('/uploadImage', async (req, res) => {
    try {
        const newpath = "..\\backend\\files\\";
        const file = req.files.image;
        const filename = req.files.image.name;
        file.mv(`${newpath}${filename}`, (err) => {
            if (err) {
                return res.status(400).json({ type: "error" });
            }
            else {
                return res.status(200).json({ type: "success" });
            }
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = route;