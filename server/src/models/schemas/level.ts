import { Schema, SchemaTypes } from "mongoose";

export const levelSchema = new Schema({
  title: {
    type: SchemaTypes.String,
    required: true,
  },
  name: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
  },
}, { timestamps: true, toJSON: { virtuals: true } });
