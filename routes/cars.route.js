const express = require("express");
const carsRouter = express.Router();
const {
  listCars,
  addNewCar,
  searchCars,
  bookCar,
  cancelOne,
} = require("../services/cars.services");

carsRouter.get("/v1/listcars ", async (req, res) => {
  let { limit, offset } = req.query;
  limit = limit ? parseInt(limit) : 10;
  offset = offset ? parseInt(offset) : 0;
  const result = await listCars(limit, offset);
  res.json({ result, errorCode: 0 }).status(result.status).end();
});

carsRouter.get("/v1/search", async (req, res) => {
  const result = await searchCars(re.query);
  res.json({ result, errorCode: 0 }).status(200).end();
});

carsRouter.post("/v1/car", async (req, res) => {
  const { price, make, milege, model, year } = req.body;
  if (!price || !make || !milege || !model || !year) {
    res.json({ message: "bad request", errorCode: -1 }).status(400).end();
  } else {
    const result = await addNewCar(price, make, milege, model, year);
    res.json({ result, errorCode: 0 }).status(201).end();
  }
});

carsRouter.post("/v1/booking", async (req, res) => {
  const carId = req.params.id;
  if (!carId) {
    res.json({ message: "bad request", errorCode: -1 }).status(400).end();
  }
  const userId = req.session.userId;
  const result = await bookCar(carId, userId);
  res.json({ result, errorCode: 0 }).status(200).end();
});

carsRouter.post("/v1/cancelling", async (req, res) => {
  const userId = req.session.userId;
  const carId = req.params.id;
  if (!carId) {
    res.json({ message: "bad request", errorCode: -1 }).status(400).end();
  }
  const result = await cancelOne(carId, userId);
  res.json({ result, errorCode: 0 }).status(200).end();
});
module.exports = carsRouter;
