import { Document, Types } from "mongoose";
import { ILevelDocument } from "./level";

export interface IStudentDocument extends Document {
  firstname: string;
  lastname: string;
  level: Types.ObjectId | ILevelDocument;
  shortname?: string;
  sex?: "MALE" | "FEMALE" | "UNKNOW";
  birthday?: Date;
}
