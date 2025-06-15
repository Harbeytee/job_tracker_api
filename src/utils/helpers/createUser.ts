const User = require("../../models/User");
const { BadRequestError } = require("../errors");

export const createUser = async (userObject: any) => {
  const { email } = userObject;

  const userData = await User.findOne({ email });
  if (userData) {
    const {authProvider} = userObject
    if(authProvider && authProvider !== userData.authProvider) {
        throw new BadRequestError(
        `You were not signed up with ${authProvider}. Please sign up with  ${authProvider} first or use a different sign-in method.`
      );
    }
    throw new BadRequestError("You are signed up already, log in");
  }

  const user = await User.create(userObject);
  const token = user.createJWT();

  return { user, token };
};
