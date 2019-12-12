const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const produtSchema = new Schema({
  "productId":{type:String},
  "productName":String,
  "salePrice":Number,
  "productNum":Number,
  "checked":String,
  "productImage":String
});

module.exports = mongoose.model('Good', produtSchema);
