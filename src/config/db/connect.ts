const mongoose = require("mongoose");
import config from "../config";

const connectDB = () => {
  const url = config.MONGO_URI;
   return mongoose.connect(url);
};

module.exports = connectDB;
