import { Document, Model, Types } from "mongoose";
import { ISchoolDocument } from "./school";

export interface ITeacherDocument extends Document {
  school: Types.ObjectId | ISchoolDocument;
}

export interface ITeacherModel extends Model<ITeacherDocument> {}
