const mongodbConnect = require ('./db');
const express = require('express');
const cors = require('cors');

mongodbConnect();
const app = express();
const port = 5000

app.use(cors())
app.use(express.json())

//Available Routes
app.use('/api/auth',require('./routes/user_auth'));
app.use('/api/product',require('./routes/products'));

app.listen(port,()=>{
    console.log('connnected to port ',port)
})