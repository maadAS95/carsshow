const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  milege: { type: Number, required: true },
  isBooked: { type: Boolean, default: false },
  bookedBy: { type: Number, required: false },
  bookedAt: { type: Date },
  publishAt: { type: Date,  },
});
const Car = mongoose.model("Car", carSchema);
module.exports = Car;
