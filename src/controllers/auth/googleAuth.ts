import User from "../../models/User";
import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError, BadRequestError } from "../../utils/errors";
import { Request, Response } from "express";
import { createUser } from "../../utils/helpers/createUser";
import config from "../../config/config";
import getGoogleToken from "../../utils/helpers/auth/getGoogleToken";
import getGoogleUser from "../../utils/helpers/auth/getGoogleUser";
import googleAuthSchema from "../../schemas/auth/googleAuthSchema";
import { AuthProviders } from "../../types/auth/enums";

console.log({ google: config.google, config });
enum GoogleAction {
  SignIn = "sign_in",
  SignUp = "sign_up",
}

const googleAuth = async (req: Request, res: Response) => {
  const { code, action } = req.body;

  //for validating payload
  googleAuthSchema.parse(req.body);

  const { access_token } = await getGoogleToken(code);
  const user = await getGoogleUser(access_token);

  const userObject = {
    googleId: user.id,
    email: user.email,
    name: user.name,
    authProvider: AuthProviders.Google,
  };

  //sign in flow
  if (action === GoogleAction.SignIn) {
    const existingUser = await User.findOne({ email: userObject.email });
    if (!existingUser) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    //if user did not sign up with google, throw error
    if (existingUser.authProvider !== AuthProviders.Google) {
      throw new BadRequestError(
        "You were not signed up with google. Please sign up with Google first or use a different sign-in method."
      );
    }

    const token = existingUser.createJWT();
    res.status(StatusCodes.OK).json({
      user: { name: existingUser.name, email: existingUser.email },
      token,
    });

    //sign up flow
  } else if (action === GoogleAction.SignUp) {
    const { token, user: newUser } = await createUser(userObject);
    res.status(StatusCodes.OK).json({
      user: { name: newUser.name, email: newUser.email },
      token,
    });
  }
};

export default googleAuth;
