import { Document, Types } from "mongoose";
import { IGradeDocument } from "./grade";

export interface IStudentDocument extends Document {
  firstname: string;
  lastname: string;
  grade: Types.ObjectId | IGradeDocument;
  shortname?: string;
  sex?: "MALE" | "FEMALE" | "UNKNOW";
  birthday?: Date;
  picture?: string;
}
