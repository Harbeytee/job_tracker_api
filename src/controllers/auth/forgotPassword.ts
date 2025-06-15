import { Request, Response } from "express";
import { AuthProviders } from "../../types/auth/enums";
import config from "../../config/config";
import sendEmail from "../../utils/helpers/auth/sendEmail";
import { StatusCodes } from "http-status-codes";
import forgotPasswordSchema from "../../schemas/auth/forgotPasswordSchema";
const User = require("../../models/user");
const Token = require("../../models/token");
const { UnauthenticatedError, BadRequestError } = require("../../utils/errors");
const crypto = require("crypto");

const forgotPassword = async (req: Request, res: Response) => {
  //validate payload
  forgotPasswordSchema.parse(req.body);

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    throw new UnauthenticatedError("user with given email doesn't exist");
  }
  if (user.authProvider !== AuthProviders.Local) {
    throw new BadRequestError(
      `This account was created  with ${user.authProvider}, \n Please sign in with ${user.authProvider} to access your account`
    );
  }

  let token = await Token.findOne({ userId: user._id });
  if (!token) {
    token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
  }

  const link = `${config.google.redirectUri}/password-reset/${user._id}?key=${token.token}`;
  await sendEmail(user.email, "Password reset", link);

  res
    .status(StatusCodes.OK)
    .json({ msg: `password reset link sent to your email account` });
};

export = forgotPassword;
