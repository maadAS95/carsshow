const cancelingBookingPeriodCondition = (bookedAt) => {
  const cancelingDiffernce = 24 * 60 * 60 * 1000;
  const currentTime = new Date().getTime();
  const differenceTime = Math.abs(bookedAt.getTime() - currentTime);
  return differenceTime > cancelingDiffernce;
};

const createQueryParams = (param) => {
  try {
    const { make, model, year, price, milege } = param;
    const query = {};
    if (make) {
      query.make = new RegExp(make, "i");
    }
    if (model) {
      query.model = new RegExp(model, "i");
    }
    if (year) {
      query.year = parseInt(year);
    }

    if (price) {
      query.price = parseInt(price);
    }
    if (milege) {
      query.price = parseInt(milege);
    }
    return query;
  } catch (error) {
    console.error(error, "errorCreateQuery..");
    return {};
  }
};

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

const validateEmail = (value) => {
  let isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    value.trim()
  );
  return isValid;
};

const handleInputBody = (body) => {
  let isValid = true;
  const { price, make, milege, model, year } = body;
  if (!price || !make || !milege || !model || !year) return (isValid = false);
  if (
    isNaN(year) ||
    isNaN(price) ||
    isNaN(milege) ||
    typeof make != "string" ||
    typeof model != "string"
  )
    return (isValid = false);
  return isValid;
};

module.exports = {
  cancelingBookingPeriodCondition,
  createQueryParams,
  handleResponse,
  generateHashedPassword,
  validateEmail,
  handleInputBody,
};
