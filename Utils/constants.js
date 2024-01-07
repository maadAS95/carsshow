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
const emailErrorMsg = {
  status: 400,
  data: [],
  message: "email is not valid",
};
const successMsg = {
  status: 200,
  data: [],
  message: "success",
};

module.exports = {
  badRequestErrorMsg,
  notFoundErrorMsg,
  conflictErrorMsg,
  emailErrorMsg,
  successMsg,
};
