const signIn = require("./signin");
const signUp = require("./signup");
const { googleAuth, googleAuthCallback } = require("./googleAuth");

export = {
  signUp,
  signIn,
  googleAuth,
  googleAuthCallback,
};
