const mongodbConnect = require ('./db');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');

mongodbConnect();
const app = express();
const port = 5000

app.use(cors())
app.use(express.json())
app.use(fileupload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname));
app.use(express.static(__dirname+"\\files"));

//Available Routes
app.use('/api/auth',require('./routes/user_auth'));
app.use('/api/product',require('./routes/products'));
app.use('/api/cart',require('./routes/cart'));

app.listen(port,()=>{
    console.log('connnected to port ',port)
})