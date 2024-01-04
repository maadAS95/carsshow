const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  milege: { type: Number, required: true },
  isBooked: { type: Boolean, default: false },
  bookedBy: { type: Number, required: false },
  bookedAt: { type: Date },
  publishAt: { type: Date, default: new Date() },
});
const Car = mongoose.model("Car", carSchema);
module.exports = Car;
