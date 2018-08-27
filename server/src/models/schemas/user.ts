import { Schema, SchemaTypes } from "mongoose";
import * as Crypto from "crypto";
import { IUserDocument } from "../user";

export const userSchema = new Schema({
  names: {
    firstname: { type: SchemaTypes.String },
    lastname: { type: SchemaTypes.String },
  },
  name: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
  },
  email: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
  },
  pass: {
    type: SchemaTypes.String,
    required: true,
  },
  salt: {
    type: SchemaTypes.String,
    required: true,
    default: () => generateSalt(),
  },
}, { timestamps: true });

function generateSalt(length: number = 16): string {
  return Crypto.randomBytes(Math.ceil(length / 2))
    .toString("hex") /** convert to hexadecimal format */
    .slice(0, length);   /** return required number of characters */
}

function hasPassword(password: string, salt: string): string {
  const hash = Crypto.createHmac("sha512", salt); /** Hashing algorithm sha512 */
  hash.update(password);
  return hash.digest("hex");
}

function comparePassword(this: IUserDocument, password: string): boolean {
  const hash = hasPassword(password, this.salt);
  return hash === this.pass;
}

userSchema.method("comparePassword", comparePassword);

function updatePassword(this: IUserDocument, next: () => void) {
  // tslint:disable-next-line:no-console
  console.log(this.isModified("pass"));
  if (this.isModified("pass")) {
    this.salt = generateSalt();
    this.pass = hasPassword(this.pass, this.salt);
  }
  return next();
}

userSchema.pre<IUserDocument>("save", updatePassword);
