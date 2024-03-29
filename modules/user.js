const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  roleId: { type: Number, required: true }, //1 for supervisor,2 for clients
});

module.exports = mongoose.model("User", userSchema);
