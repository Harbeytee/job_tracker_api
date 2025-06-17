import { Request, Response } from "express";
import resetPasswordSchema from "../../schemas/auth/resetPasswordSchema";
import { StatusCodes } from "http-status-codes";
import Token from "../../models/Token";
import User from "../../models/User";
import { BadRequestError } from "../../utils/errors";

const resetPassword = async (req: Request, res: Response) => {
  //validate request body
  resetPasswordSchema.parse(req.body);

  const { password, key } = req.body;

  //find user with matching token
  const user = await User.findById(req.params.userId);
  if (!user) throw new BadRequestError("Invalid link or expired");

  const token = await Token.findOne({
    userId: user._id,
    token: key,
  });
  if (!token) throw new BadRequestError("Invalid link or expired");

  const isPasswordMatch = await user.comparePassword(password);
  if (isPasswordMatch) {
    throw new BadRequestError(
      "New password cannot be the same as old password"
    );
  }

  user.password = password;
  await user.save();
  await token.deleteOne();

  res.status(StatusCodes.OK).json({ msg: "password reset successfuly" });
};

export default resetPassword;
