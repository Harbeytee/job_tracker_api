import SignInSchema from "../../schemas/auth/sign-in";
import { Request, Response } from "express";
import { AuthProviders } from "../../types/auth/enums";
import User from "../../models/User";
import { UnauthenticatedError } from "../../utils/errors";
import { StatusCodes } from "http-status-codes";

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  //for validating payload
  SignInSchema.parse(req.body);

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  //making sure they sign in with the authprovider they signed up with
  if (user.authProvider !== AuthProviders.Local) {
    throw new UnauthenticatedError(
      `This account was created with ${user.authProvider}, sign in with ${user.authProvider} to continue`
    );
  } else {
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    message: "User signed in successfully",
    data: { name: user.name, email: user.email },
    token,
  });
};

export default signIn;
