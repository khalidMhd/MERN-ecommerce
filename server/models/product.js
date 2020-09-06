const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {type:String,required:true},
    photo: {type:String, required:true},
    price: {type:Number,required:true},
    countInStock:{type:Number,required:true,default:3},
    detail: {type:String,required:true},
    created_At: {type:Date,default:Date.now},
})

const product = mongoose.model('product', productSchema)
module.exports = product