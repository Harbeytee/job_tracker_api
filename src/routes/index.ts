const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const jobRoutes = require("./jobs");
const authenticationMiddleware = require("../middleware/authentication");

router.use("/auth", authRoutes);
router.use("/jobs", authenticationMiddleware, jobRoutes);

module.exports = router;
