import { Request } from "express";

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  authProvider?: "local" | "google";
}

export interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}
