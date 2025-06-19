import { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { Error as MongooseError } from "mongoose";

interface CustomError extends Error {
  statusCode?: number;
  errors: MongooseError.ValidationError["errors"];
  code?: number;
  keyValue: { [key: string]: string };
  value?: string;
}

const errorHandlerMiddleware: ErrorRequestHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const customError = {
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
  res.status(customError.statusCode).json({ ...customError, err });
};

export default errorHandlerMiddleware;
