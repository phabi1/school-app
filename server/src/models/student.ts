import { Document, Types } from "mongoose";
import { ILevelDocument } from "./level";

export interface IStudent {
  _id?: Types.ObjectId;
  firstname: string;
  lastname: string;
  level: Types.ObjectId | ILevelDocument;
  shortname?: string;
  sex?: "MALE" | "FEMALE" | "UNKNOW";
  birthday?: Date;
}
