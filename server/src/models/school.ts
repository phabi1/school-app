import { Document, Model, model } from "mongoose";
import { schoolSchema } from "./schemas/school";

export interface ISchoolDocument extends Document {
  name: string;
}

export interface ISchoolModel extends Model<ISchoolDocument> {}

export const schoolModel = model<ISchoolDocument, ISchoolModel>("School", schoolSchema);
