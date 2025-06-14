const User = require('../models/User')
const { StatusCodes } = require ('http-status-codes')
import { Request, Response } from 'express';
const { BadRequestError, UnauthenticatedError } = require('../utils/errors')

const signUp = async (req: Request, res: Response) => {
   const { email } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError('Email already exists');
  }

  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
 
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name, email: user.email }, token })
}

module.exports = {
 signUp,
  signIn,
}
