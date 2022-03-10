require('dotenv').config({path:__dirname+'/.env'});

module.exports = {
    JWT_SECRET:process.env.JWT_SECRET,
    DB_PASSWORD:process.env.database_password
}