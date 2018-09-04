import { Document, Model, model, Types } from "mongoose";
import { ILevelDocument, LevelModel } from "./level";
import { classSchema } from "./schemas/class";
import { ISchoolDocument } from "./school";
import { IStudentDocument } from "./student";
import { ITeacherDocument } from "./teacher";

export interface IClassDocument extends Document {
  start: Date;
  end: Date;
  teacher: Types.ObjectId | ITeacherDocument;
  students: Types.DocumentArray<IStudentDocument>;
  school: Types.ObjectId | ISchoolDocument;
  levels: Types.ObjectId[] | ILevelDocument[];
  hasMutipleLevel: boolean;
}

export interface IClassModel extends Model<IClassDocument> { }

export const ClassModel = model<IClassDocument, IClassModel>("Class", classSchema);
