const User = require("../modules/user");

function authentication(req, res, next) {
  const authheader = req.headers.authorization;
  if (!authheader) {
    let err = new Error("You are not authenticated!");
    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;
    res.send(err);
    return;
  }

  const auth = new Buffer.from(authheader.split(" ")[1], "base64")
    .toString()
    .split(":");
  const user = auth[0];
  const pass = auth[1];
  const USERNAME_API = process.env.USERNAME_API;
  const PASSWORD_API = process.env.PASSWORD_API;
  if (user == USERNAME_API && pass == PASSWORD_API) {
    // If Authorized user
    next();
  } else {
    let err = new Error("You are not authenticated!");
    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;
    res.send(err);
    return;
  }
}

const authorizeUser = async (userId) => {
  console.log(userId, "userId");
  if (!userId) return false;

  const user = await User.findById(userId);
  console.log(user, "uu");
  const { roleId } = user;
  const isAuthorizedUser = roleId == 1 ? true : false;
  return isAuthorizedUser;
};

module.exports = { authentication, authorizeUser };
