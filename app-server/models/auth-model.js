const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  flName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const AuthModel = mongoose.model("auths", authSchema);

module.exports = AuthModel;
