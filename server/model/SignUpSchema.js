const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SignUpSchemaModel = new Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  phone: { type: String, require: true },
  date: { type: String, default: Date.now() },
});

const SignUpSchema = mongoose.model("users", SignUpSchemaModel);
module.exports = SignUpSchema;
