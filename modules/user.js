const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: { type: Number, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: Number, required: true },
  roleId: { type: Number, required: true },
});

module.exports = mongoose.model("User", userSchema);
