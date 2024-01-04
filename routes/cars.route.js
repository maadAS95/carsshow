const express = require("express");
const carsRouter = express.Router();
const {
  listCars,
  addNewCar,
  searchCars,
  filterCars,
  bookCar,
  cancelOne,
} = require("../services/cars.services");

carsRouter.get("/v1/listcars", async (req, res) => {
  let { limit, offset } = req.query;
  limit = limit ? parseInt(limit) : 10;
  offset = offset ? parseInt(offset) : 0;
  const result = await listCars(limit, offset);
  res.json(result).status(result.status).end();
});
carsRouter.get("/v1/search", async (req, res) => {
  const { params } = req.query;
  const result = await searchCars(params);
  res.json({ result }).status(200).end();
});
carsRouter.get("/v1/filter", async (req, res) => {
  const { params } = req.query;
  const result = await filterCars(params);
  res.json({ result }).status(200).end();
});
carsRouter.post("/v1/car", async (req, res) => {
  const payload = req.body;
  const result = await addNewCar(payload);
  res.json({ result }).status(201).end();
});
carsRouter.post("/v1/booking", async (req, res) => {
  const carId = req.params;
  const userId = req.session.userId;
  const result = await bookCar(carId, userId);
  res.json({ result }).status(201).end();
});
carsRouter.post("/v1/cancelling", async (req, res) => {
  const userId = req.session.userId;
  const carId = req.params;

  const result = await cancelOne(carId, userId);
  res.json({ result }).status(200).end();
});
module.exports = carsRouter;
