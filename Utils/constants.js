const notFoundErrorMsg = {
  status: 404,
  data: [],
  message: "sorry, wrong cradentials",
};

const badRequestErrorMsg = {
  status: 400,
  data: [],
  message: "failed",
};

const conflictErrorMsg = {
  status: 409,
  data: [],
  message: "user is already exist",
};

module.exports = {
  badRequestErrorMsg,
  notFoundErrorMsg,
  conflictErrorMsg,
};
