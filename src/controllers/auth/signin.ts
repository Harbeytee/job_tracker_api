const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError } = require("../../utils/errors");
import SignInSchema from "../../schemas/auth/sign-in";

import { Request, Response } from "express";

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  //for validating payload
  SignInSchema.parse(req.body);

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  if (user.authProvider !== "local") {
    throw new UnauthenticatedError(
      `You signed up with ${user.authProvider}, sign in with ${user.authProvider}`
    );
  } else {
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
  }

  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, email: user.email }, token });
};

export = signIn;
