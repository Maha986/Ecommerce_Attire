const mongoose = require('mongoose');
const config = require('./config');

const mongoURI = "mongodb+srv://crystalball_maha:"+config.DB_PASSWORD+"@cluster0.mcoit.mongodb.net/attire?authSource=admin&replicaSet=atlas-r8qjs5-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

const mongodbConnect=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongoose successfully");
    })
}

module.exports = mongodbConnect;