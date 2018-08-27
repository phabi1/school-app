import { Document, Model, Types, model } from "mongoose";
import { ILevelDocument } from "./level";
import { ISchoolDocument } from "./school";
import { IStudentDocument } from "./student";
import { ITeacherDocument } from "./teacher";
import { classSchema } from "./schemas/class";

export interface IClassDocument extends Document {
  start: Date;
  end: Date;
  teacher: Types.ObjectId | ITeacherDocument;
  students: IStudentDocument[];
  school: Types.ObjectId | ISchoolDocument;
  levels: Types.ObjectId[] | ILevelDocument[];
  hasMutipleLevel: boolean;
}

export interface IClassModel extends Model<IClassDocument> { }

export const ClassModel = model<IClassDocument, IClassModel>("Class", classSchema);
