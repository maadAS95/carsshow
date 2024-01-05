const cancelingBookingPeriodCondition = (bookedAt) => {
  const cancelingDiffernce = 24 * 60 * 60 * 1000;
  const currentTime = new Date().getTime();
  const differenceTime = Math.abs(bookedAt.getTime() - currentTime);
  return differenceTime > cancelingDiffernce;
};

const createQueryParams = (param) => {
  try {
    const { make, model, startDate, endDate, minPrice, maxPrice, milege } =
      param;
    const query = {};
    if (make) {
      query.make = make;
    }
    if (model) {
      query.model = model;
    }
    if (startDate || endDate) {
      query.year = {};

      if (startDate) {
        query.year.$gte = startDate;
      }

      if (endDate) {
        query.year.$lte = endDate;
      }
    }

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = parseInt(minPrice);
      }

      if (req.query.maxPrice) {
        query.price.$lte = parseInt(req.query.maxPrice);
      }
    }
    return query;
  } catch (error) {
    console.error(error, "errorCreateQuery..");
    return {};
  }
};

// db.cars.find({
//   $where: function() {
//     return this.milege !== null && this.milege !== undefined;
//   },
//   $expr: {
//     $eq: [
//       "$milege",
//       db.cars.aggregate([
//         {
//           $addFields: {
//             absoluteDifference: {
//               $abs: {
//                 $subtract: ["$milege", milege]
//               }
//             }
//           }
//         },
//         {
//           $sort: {
//             absoluteDifference: 1
//           }
//         },

//       ]).next().milege
//     ]
//   }
// });

const handleResponse = (status) => {
  const responseCode = {
    errorCode: status != 200 ? -1 : 0,
    status: status != 200 ? 400 : 201,
  };
  return responseCode;
};

const generateHashedPassword = async (password) => {
  const bcrypt = require("bcrypt");
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports = {
  cancelingBookingPeriodCondition,
  createQueryParams,
  handleResponse,
  generateHashedPassword,
};
