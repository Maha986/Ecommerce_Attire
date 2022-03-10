const express = require('express');
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const config = require('../config');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const route = express.Router();

//signup
route.post('/createUser', [
    body('password', 'Password must be atleast 8 character long').isLength({ min: 8 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error=errors.array();
        return res.status(400).json({ message: error[0].msg});
    }

    try {
        //user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: 'Sorry, a user with this email already exists.' });
        }

        //create salt and hash for secure password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //create a new user
        user = await User.create({
            user_name: req.body.user_name,
            email: req.body.email,
            password: secPass,
            shippingAddress: req.body.shippingAddress,
            billingAddress: req.body.billingAddress,
            phoneNo: req.body.phoneNo,
            status: req.body.status
        })

        // const data = {
        //     user: { id: user.id }
        // }

        // const authToken = jwt.sign(data, config.JWT_SECRET);
        res.json({ message: true });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})


//login
route.post('/login', [
    body('password', "Password can not be blank").exists()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ type:"error" ,message: errors.array() });
        }
        try {
            //find a user with the email
            let user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ message: 'Please Signup first' })
            }
            
            const passwordCompare = await bcrypt.compare(req.body.password, user.password)
            if (!passwordCompare) {
                res.status(400).json({ type:"error", message: 'Please enter valid credentials' })
            }

            const data = {
                user: { id: user.id }
            }
            
            const authToken = jwt.sign(data, config.JWT_SECRET);
            res.json({ type:"success",message: authToken, user: user });
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }

    })

    route.post('/getuser', fetchuser, async (req, res) => {
        // console.log(__dirname);
        try {
          userId = req.user.id;
          const user = await User.findById(userId).select("-password"); //-password means select all except password
          res.send(user);
        }
        catch (error) {
          console.log(error);
          res.status(500).send("Internal Server Error");
        }
      });
module.exports = route;