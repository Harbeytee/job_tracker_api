const User = require("../../models/User");
const { BadRequestError } = require("../errors");

export const createUser = async (userObject: any) => {
  const { email } = userObject;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("You are signed up already, log in");
  }

  const user = await User.create(userObject);
  const token = user.createJWT();

  return { user, token };
};
