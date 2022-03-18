const mongoose = require('mongoose');
const MyUserSchema = require("../models/userSchema");
require("dotenv").config();
const dburl=process.env.DATABASE;
const dbOption= {
    useNewUrlParser:true,
    useUnifiedTopology:true
}
console.log(dburl)
const connection = mongoose.createConnection(dburl,dbOption);
const User = connection.model('User',MyUserSchema);

module.exports = connection;