import { Schema, SchemaTypes } from "mongoose";

export const schoolSchema = new Schema({
  name: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
  },
}, { timestamps: true });
