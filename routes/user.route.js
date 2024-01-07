const express = require("express");

const userRouter = express.Router();
const { login, signUp } = require("../services/users.services");
const { handleResponse } = require("../Utils/utils");

userRouter.post("/v1/login", async (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    res.json({ errorCode: -1, message: "bad request" }).status(400).end();
    return;
  }

  const result = await login(email, password);
  const { status, errorCode } = handleResponse(result.status);
  req.session["userId"] = result.data._id || null;
  req.session.id = result.data._id;
  req.session.save();
  res.json({ result, errorCode }).status(status).end();
});

userRouter.post("/v1/signup", async (req, res) => {
  const { userName, password, email, roleId } = req.body;

  if (!userName || !password || !email) {
    res.json({ errorCode: -1, message: "bad request" }).status(400).end();
    return;
  }
  const result = await signUp(userName, password, email, roleId);
  req.session["userId"] = result.data._id || null;
  const { errorCode, status } = handleResponse(result.status);
  res.json({ result, errorCode }).status(status).end();
});

module.exports = userRouter;
