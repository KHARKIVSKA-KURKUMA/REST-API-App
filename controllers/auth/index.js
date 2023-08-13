const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateUserSubscription = require("./updateUserSubscription");
const setAvatar = require("./setAvatar");
const resendVerifyEmail = require("./resendVerifyEmail");
const verifyEmail = require("./verifyEmail");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateUserSubscription,
  setAvatar,
  resendVerifyEmail,
  verifyEmail,
};
