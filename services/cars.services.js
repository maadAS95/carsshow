const { ObjectId } = require("mongodb");
const Car = require("../modules/car");
const {
  cancelingBookingPeriodCondition,
  createQueryParams,
} = require("../Utils/utils");

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
    return {
      status: 400,
      data: [],
      message: "failed",
    };
  }
};

const listCars = async (limit, offset) => {
  try {
    const cars = await Car.find({}, { __v: 0 }).skip(offset).limit(limit);
    return {
      status: 200,
      data: cars,
      message: "success",
    };
  } catch (error) {
    console.error(error, "Error list all car");
    return {
      status: 400,
      data: [],
      message: "failed",
    };
  }
};
const searchCars = async (param) => {
  try {
    const query = createQueryParams(param);
    console.log(query, "querySearch");
    const cars = await Car.find(query);
    return {
      status: 200,
      data: cars,
      message: "success",
    };
  } catch (error) {
    console.error("error searching..");
    return {
      status: 400,
      data: [],
      message: "failed",
    };
  }
};
const bookCar = async (carId, userId) => {
  try {
    const car = await getCar(carId);
    if (!car) {
      return {
        status: 404,
        data: [],
        message: "car not found!",
      };
    }
    const objCarId = new ObjectId(carId);
    const updatedCar = await Car.updateOne(
      {
        _id: objCarId,
      },
      { $set: { isBooked: true, bookedBy: userId, bookedAt: new Date() } }
    );
    return {
      status: 200,
      data: [],
      message: "success",
    };
  } catch (error) {
    console.error(error, "Error booking car");
    return {
      status: 400,
      data: [],
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
    const updatedCar = await Car.updateOne(
      {
        _id: carId,
      },
      { $set: { isBooked: false } }
    );
    return {
      status: 200,
      data: [],
      message: "success",
    };
  } catch (error) {
    console.error(error, "Error cancelling car");
    return {
      status: 400,
      data: [],
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
  bookCar,
  cancelOne,
};
