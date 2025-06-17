import { NextFunction, Request, Response } from "express";
import config from "../config/config";
import { UnauthenticatedError } from "../utils/errors";
const jwt = require("jsonwebtoken");

interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

const authenticationMiddleware = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, config.jwt.secret!);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export default authenticationMiddleware;
