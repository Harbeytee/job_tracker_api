const mongoose = require("mongoose");
import config from "../config";

const connectDB = () => {
  const url = config.mongoUri;
  return mongoose.connect(url);
};

module.exports = connectDB;
