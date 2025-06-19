import { Request, Response } from "express";
import { createUser } from "../../utils/helpers/createUser";
import { StatusCodes } from "http-status-codes";

const signUp = async (req: Request, res: Response) => {
  const { user, token } = await createUser({ ...req.body });
  res.status(StatusCodes.CREATED).json({
    statusCode: StatusCodes.OK,
    message: "User signed up successfully",
    data: { name: user.name },
    token,
  });
};

export default signUp;
