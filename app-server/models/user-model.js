const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  city: String,
  contactNumber: String,
  email: String,
  gender: String,
  dob: Date,
  maritalStatus: String,
  age: Number,
  address: String,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
