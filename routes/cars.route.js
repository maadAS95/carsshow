const express = require("express");
const carsRouter = express.Router();
const {
  listCars,
  addNewCar,
  searchCars,
  bookCar,
  cancelOne,
  viewMyCars,
} = require("../services/cars.services");
const { handleResponse, handleInputBody } = require("../Utils/utils");
const { authorizeUser } = require("../middlewares/auth.middleware");

carsRouter.get("/v1/listcars", async (req, res) => {
  let { limit, offset } = req.query;
  limit = limit ? parseInt(limit) : 10;
  offset = offset ? parseInt(offset) : 0;
  const result = await listCars(limit, offset);
  const { status, errorCode } = handleResponse(result.status);

  res.json({ result, errorCode }).status(status).end();
});

carsRouter.get("/v1/search", async (req, res) => {
  const result = await searchCars(req.query);
  res.json({ result, errorCode: 0 }).status(200).end();
});

carsRouter.post("/v1/car", async (req, res) => {
  const { price, make, milege, model, year } = req.body;
  const isAuthorized = await authorizeUser(req.session.userId);
  console.log(isAuthorized, "iiiss");
  if (!isAuthorized) {
    res
      .json({ message: "you are not authorized user!", errorCode: -1 })
      .status(401)
      .end();
  } else {
    const isValidBody = handleInputBody(req.body);
    if (!isValidBody) {
      res.json({ message: "bad request", errorCode: -1 }).status(400).end();
    } else {
      const result = await addNewCar(price, make, milege, model, year);
      const errorCode = result.status == 201 ? 0 : -1;
      const statusRes = result.status == 201 ? 201 : 400;
      res.json({ result, errorCode }).status(statusRes).end();
    }
  }
});

carsRouter.get("/v1/booking/:id", async (req, res) => {
  const carId = req.params.id;
  if (!carId) {
    res.json({ message: "bad request", errorCode: -1 }).status(400).end();
    return;
  }
  const userId = req.session.userId;

  if (!userId) {
    res
      .json({ message: "please login before booking car", errorCode: -1 })
      .status(401)
      .end();
    return;
  }
  const result = await bookCar(carId, userId);
  const { status, errorCode } = handleResponse(result.status);

  res.json({ result, errorCode }).status(status).end();
});

carsRouter.post("/v1/cancelling/:id", async (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res
      .json({
        message: "please login before cancel booking car",
        errorCode: -1,
      })
      .status(401)
      .end();
    return;
  }
  const carId = req.params.id;
  if (!carId) {
    res.json({ message: "bad request", errorCode: -1 }).status(400).end();
    return;
  }
  const result = await cancelOne(carId, userId);
  const { status, errorCode } = handleResponse(result.status);

  res.json({ result, errorCode }).status(status).end();
});

carsRouter.get("/v1/myCars", async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    res
      .json({ message: "please login before", errorCode: -1 })
      .status(400)
      .end();
    return;
  }
  const result = await viewMyCars(userId);
  const { status, errorCode } = handleResponse(result.status);

  res.json({ result, errorCode }).status(status).end();
});
module.exports = carsRouter;
