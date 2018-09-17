import { Schema, SchemaTypes } from "mongoose";

// tslint:disable-next-line:no-var-requires
const MongooseTree = require("mongoose-tree");

export const gradeSchema = new Schema({
  title: {
    type: SchemaTypes.String,
    required: true,
  },
  name: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
  },
  weight: {
    type: SchemaTypes.Number,
    default: 0,
  },
}, { timestamps: true, toJSON: { virtuals: true } });

gradeSchema.plugin(MongooseTree);
