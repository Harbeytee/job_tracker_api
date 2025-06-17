import { NextFunction, Request, Response } from "express";
import config from "../config/config";
import { UnauthenticatedError } from "../utils/errors";
import jwt, { JwtPayload } from "jsonwebtoken";

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
    const payload = jwt.verify(token, config.jwt.secret!) as JwtPayload;
    req.user = { userId: payload.userId };
    next();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export default authenticationMiddleware;
