import { Document, Model } from "mongoose";

export interface IStudentDocument extends Document {
  name: string;
}

export interface IStudentModel extends Model<IStudentDocument> {}
