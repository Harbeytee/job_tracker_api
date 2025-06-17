export interface IUser {
  id?: string;
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  authProvider?: "local" | "google";
}
