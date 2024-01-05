const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URL;

async function createonnection() {
  mongoose.connect(uri);
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });
}

module.exports = {
  createonnection,
};
