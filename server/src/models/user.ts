import { Document, Model, model } from "mongoose";
import { userSchema } from "./schemas/user";

export interface IUserDocument extends Document {
  names: {
    firstname: string;
    lastname: string;
  };
  name: string;
  email: string;
  pass: string;
  salt: string;
  comparePassword(password: string): boolean;
}

export interface IUserModel extends Model<IUserDocument> { }

export const UserModel = model<IUserDocument, IUserModel>("User", userSchema);
