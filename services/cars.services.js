const Car = require("../modules/car");
const { cancelingBookingPeriodCondition } = require("../Utils/utils");

const addNewCar = async (params) => {
  try {
    const car = new Car({
      brand: params.brand,
      price: params.price,
      model: params.model,
      milege: params.milege,
      pulishAt: new Date(),
    });
    const result = await car.save();
    console.log(result);
    return {
      status: 201,
      message: "success",
      result,
    };
  } catch (error) {
    console.error(error, "Error adding new car");
    return {
      status: 400,
      result: [],
      message: "failed",
    };
  }
};

const listCars = async (limit, offset) => {
  try {
    console.log({ limit, offset });
    const cars = await Car.find({}).skip(offset).limit(limit);
    console.log(cars);
    return {
      status: 200,
      result: cars,
      message: "success",
    };
  } catch (error) {
    console.error(error, "Error list all car");
    return {
      status: 400,
      result: [],
      message: "failed",
    };
  }
};
const searchCars = async (params) => {
  try {
    const cars = await Car.find({
      $or: [{ model: params.model }, { brand: params.brand }],
    });
    return {
      status: 200,
      result: cars,
      message: "success",
    };
  } catch (error) {
    console.error("error searching..");
    return {
      status: 400,
      result: [],
      message: "failed",
    };
  }
};
const filterCars = async (params) => {};
const bookCar = async (carId, userId) => {
  try {
    const car = await getCar(carId);
    if (!car) {
      return {
        status: 404,
        result: [],
        message: "car not found!",
      };
    }
    const updatedCar = await Car.updateOne(
      {
        _id: carId,
      },
      { $set: { isBooked: true, bookedBy: userId, bookedAt: new Date() } }
    );
    return {
      status: 200,
      result: [],
      message: "success",
    };
  } catch (error) {
    console.error(error, "Error booking car");
    return {
      status: 400,
      result: [],
      message: "failed",
    };
  }
};
const cancelOne = async (carId, userId) => {
  try {
    const car = await getCar(carId);
    if (!car) {
      return {
        status: 404,
        result: [],
        message: "car not found!",
      };
    }
    const { bookedAt, bookedBy } = car;
    if (bookedBy !== userId) {
      return {
        status: 401,
        result: [],
        message: "you are not authorized to complete cancelling!",
      };
    }
    const canCancel = cancelingBookingPeriodCondition(bookedAt);
    if (!canCancel) {
      return {
        status: 400,
        result: [],
        message: "you can not cancel before 24 hours !",
      };
    }
    const updatedCar = await Car.updateOne(
      {
        _id: carId,
      },
      { $set: { isBooked: true, bookedBy: userId, bookedAt: new Date() } }
    );
    return {
      status: 200,
      result: [],
      message: "success",
    };
  } catch (error) {
    console.error(error, "Error cancelling car");
    return {
      status: 400,
      result: [],
      message: "failed",
    };
  }
};
const getCar = async (carId) => {
  const car = await Car.findById({
    _id: carId,
  });
  console.log(car, "car33344");
  return car;
};

module.exports = {
  addNewCar,
  listCars,
  searchCars,
  filterCars,
  bookCar,
  cancelOne,
};
