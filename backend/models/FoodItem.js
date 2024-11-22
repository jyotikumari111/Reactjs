const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodItemSchema = new Schema({
   name: { type: String, required: true },
   price: { type: Number, required: true },
   description: String,
   image: String,
});

module.exports = mongoose.model('FoodItem', FoodItemSchema);
