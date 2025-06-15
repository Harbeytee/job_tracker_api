const signIn = require("./signin");
const signUp = require("./signup");
const { googleAuth, googleAuthCallback } = require("./googleAuth");
const forgotPassword = require("./forgotPassword");
const resetPassword = require("./resetPassword");

export = {
  signUp,
  signIn,
  googleAuth,
  googleAuthCallback,
  resetPassword,
  forgotPassword,
};
