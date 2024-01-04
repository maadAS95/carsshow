const express = require("express");
const app = express();
require("dotenv").config();

const { createonnection } = require("./configuration/connectiondb");
const carRouter = require("./routes/cars.route");
const port = process.env.PORT;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/cars", carRouter);
createonnection();

app.listen(port, () => {
  `server is running on port ${port}`;
});
