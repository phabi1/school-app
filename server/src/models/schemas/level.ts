import { Schema, SchemaTypes } from "mongoose";

export const levelSchema = new Schema({
  name: {
    type: SchemaTypes.String,
    required: true,
  }
}, { timestamps: true });