const { ObjectId } = require("mongodb");
const Car = require("../modules/car");
const {
  cancelingBookingPeriodCondition,
  createQueryParams,
} = require("../Utils/utils");
const { badRequestErrorMsg, successMsg } = require("../Utils/constants");

const addNewCar = async (price, make, milege, model, year) => {
  try {
    const car = new Car({
      make: make,
      price: price,
      model: model,
      milege: milege,
      year: year,
      publishAt: new Date(),
    });
    const result = await car.save();
    return {
      status: 201,
      message: "success",
      data: result,
    };
  } catch (error) {
    console.error(error, "Error adding new car");
    return badRequestErrorMsg;
  }
};
// I think there 2 approches about booked cars,i choose to view all cars even booked, users can ask for another
//one if it is suitable for him
const listCars = async (limit, offset) => {
  try {
    const cars = await Car.find({}, { __v: 0 }).skip(offset).limit(limit);
    successMsg.data = cars;
    return successMsg;
  } catch (error) {
    console.error(error, "Error list all car");
    return badRequestErrorMsg;
  }
};
const searchCars = async (param) => {
  try {
    const query = createQueryParams(param);
    console.log(query, "querySearch");
    const cars = await Car.find(query, { __v: 0 });
    successMsg.data = cars;
    return successMsg;
  } catch (error) {
    console.error("error searching..", error);
    return badRequestErrorMsg;
  }
};

const bookCar = async (carId, userId) => {
  try {
    const car = await getCar(carId);
    if (!car || car.isBooked) {
      return {
        status: !car ? 404 : 400,
        data: [],
        message: !car ? "car not found!" : "car is already booked",
      };
    }
    const objCarId = new ObjectId(carId);
    const updatedCar = await Car.updateOne(
      {
        _id: objCarId,
      },
      { $set: { isBooked: true, bookedBy: userId, bookedAt: new Date() } }
    );
    console.log(updatedCar, "updatedCar");
    return successMsg;
  } catch (error) {
    console.error(error, "Error booking car");
    return badRequestErrorMsg;
  }
};
const cancelOne = async (carId, userId) => {
  try {
    const car = await getCar(carId);
    if (!car) {
      return {
        status: 404,
        data: [],
        message: "car not found!",
      };
    }
    const { bookedAt, bookedBy } = car;
    if (bookedBy !== userId) {
      return {
        status: 401,
        data: [],
        message: "you are not authorized to complete cancelling!",
      };
    }
    const canCancel = cancelingBookingPeriodCondition(bookedAt);
    if (!canCancel) {
      return {
        status: 400,
        data: [],
        message: "you can not cancel before 24 hours !",
      };
    }
    const objCarId = new ObjectId(carId);
    const updatedCar = await Car.updateOne(
      {
        _id: objCarId,
      },
      { $set: { isBooked: false, canceledAt: new Date() } }
    );
    return successMsg;
  } catch (error) {
    console.error(error, "Error cancelling car");
    return badRequestErrorMsg;
  }
};
const getCar = async (carId) => {
  const car = await Car.findById({
    _id: carId,
  });
  return car;
};
//view all booked cars for clients
const viewMyCars = async (userId) => {
  try {
    const cars = await Car.find(
      {
        bookedBy: userId,
      },
      { __v: 0 }
    );
    successMsg.data = cars;
    return successMsg;
  } catch (error) {
    console.error(error, "Error view my car");
    return badRequestErrorMsg;
  }
};

module.exports = {
  addNewCar,
  listCars,
  searchCars,
  bookCar,
  cancelOne,
  viewMyCars,
};
