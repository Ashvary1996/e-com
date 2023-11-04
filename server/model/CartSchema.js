const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchemaModel = new Schema({
  title: { type: String },
  price: { type: String },
  description: { type: String },
  category: { type: String },
  image: { type: String },
  rating: { type: Object },
  date: { type: String, default: Date.now() },
});

const CartSchema = mongoose.model("user_cart", CartSchemaModel);
module.exports = CartSchema;
