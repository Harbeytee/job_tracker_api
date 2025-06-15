const { StatusCodes } = require("http-status-codes");
import { Request, Response } from "express";
import { createUser } from "../../utils/helpers/createUser";

const signUp = async (req: Request, res: Response) => {
  const { user, token } = await createUser({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

export = signUp;
