import User from "../../models/User";
import { IUser } from "../../types/auth/interface";
import { BadRequestError } from "../errors";

export const createUser = async (userObject: IUser) => {
  const { email } = userObject;

  const userData = await User.findOne({ email });
  if (userData) {
    const { authProvider } = userObject;
    if (authProvider && authProvider !== userData.authProvider) {
      throw new BadRequestError(
        `This account was not created with ${authProvider}. \nPlease sign up with  ${authProvider} first or use a different sign-in method.`
      );
    }
    throw new BadRequestError("You are signed up already, log in");
  }

  const user = await User.create(userObject);
  const token = user.createJWT();

  return { user, token };
};
