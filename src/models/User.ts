import { model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import config from "../config/config";
import jwt, { SignOptions } from "jsonwebtoken";

interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  authProvider?: "local" | "google";
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    minlength: [6, "Password must be at least 6 characters long"],
    required: [
      function () {
        // Password required if authProvider is not set (local user)
        return !this.authProvider;
      },
      "Please provide password",
    ],
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
});

UserSchema.pre("save", async function () {
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name, email: this.email },
    config.jwt.secret!,
    {
      expiresIn: config.jwt.lifetime,
    } as SignOptions
  );
};

UserSchema.methods.comparePassword = async function (userPassword: string) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

module.exports = models.User || model("User", UserSchema);
