const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    item:String,
    dateCreated: {type:String,default:Date},
    time: String,
    completion_date: String,
    Status: { type: String, default: "Not set"}

})

module.exports = mongoose.model('Todo', todoSchema)