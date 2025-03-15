const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["patient", "doctor", "admin"], required: true }, // Role to differentiate users
  name: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  contact: { type: String },
  specialization: { type: String }, // Only for doctors
});

module.exports = mongoose.model("User", userSchema);
