const express = require("express");
const router = express.Router();
const { signUp, signIn, googleAuth } = require("../controllers/auth");

router.post("/google", googleAuth);
router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = router;
