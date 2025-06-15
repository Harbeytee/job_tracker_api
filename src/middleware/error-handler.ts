const { StatusCodes } = require("http-status-codes");
import { Request, Response, NextFunction } from "express";
import { Error as MongooseError } from "mongoose";

interface CustomError extends Error {
  statusCode?: number;
  errors: MongooseError.ValidationError["errors"];
  code?: number;
  keyValue: { [key: string]: any };
  value?: string;
}

const errorHandlerMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };
  if (err.name === "ValidationError" || err.name === "ZodError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", \n");
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  if (err.name === "CastError") {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }
  return res.status(customError.statusCode).json({ ...customError, err });
};

module.exports = errorHandlerMiddleware;
