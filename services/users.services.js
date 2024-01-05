const bcrypt = require("bcrypt");
const User = require("../modules/user");
const {
  notFoundErrorMsg,
  badRequestErrorMsg,
  conflictErrorMsg,
} = require("../Utils/constants");
const { generateHashedPassword } = require("../Utils/utils");

const login = async (email, password) => {
  try {
    const existUser = await getUserByEmail(email);
    if (!existUser.length) {
      return notFoundErrorMsg;
    }
    const hashedPassword = existUser[0].password;
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      return notFoundErrorMsg;
    }
    return {
      status: 200,
      data: existUser[0]._id,
      message: "success!",
    };
  } catch (error) {
    console.error("error loggin", error);
    return badRequestErrorMsg;
  }
};

const signUp = async (userName, password, email, roleId) => {
  try {
    roleId = !isNaN(roleId) ? 1 : 2;
    const existUser = await getUserByEmail(email);
    if (existUser.length) {
      return conflictErrorMsg;
    }
    const hashedPassword = await generateHashedPassword(password);

    const newUser = new User({
      userName,
      roleId,
      email,
      password: hashedPassword.toString(),
    });
    const result = await newUser.save();
    return {
      status: 200,
      data: result._id,
      message: "user created successful!",
    };
  } catch (error) {
    console.error("error sign up", error);
    return badRequestErrorMsg;
  }
};

const getUserByEmail = async (email) => {
  const user = await User.find({ email: email });

  return user;
};

module.exports = {
  login,
  signUp,
};
