const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
});

async function createonnection() {
  try {
    await client.connect();
    console.log("connected to mongo atlas");
  } catch (error) {
    console.log(error, "error connecting db");
  }
}

module.exports = {
  createonnection,
};
