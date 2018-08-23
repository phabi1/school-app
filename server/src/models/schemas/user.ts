import { Schema, SchemaTypes } from "mongoose";

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
}, { timestamps: true });
