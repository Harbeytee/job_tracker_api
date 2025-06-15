const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  googleAuth,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

router.post("/google", googleAuth);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:userId", resetPassword);

module.exports = router;
