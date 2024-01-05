const express = require("express");
const app = express();
require("dotenv").config();

const { createonnection } = require("./configuration/connectiondb");
const { authentication } = require("./middlewares/auth.middleware");

const carRouter = require("./routes/cars.route");
const userRouter=require("./routes/user.route")
const port = process.env.PORT;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
//add middleware to handle authorized users only!
app.use(authentication)

app.use("/cars", carRouter);
app.use("/auth", userRouter);

createonnection();

app.listen(port, () => {
  `server is running on port ${port}`;
});
