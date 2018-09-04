import { Document, Model, model, Types } from "mongoose";
import { IGradeDocument, LevelModel } from "./grade";
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
  grades: Types.ObjectId[] | IGradeDocument[];
  hasMutipleGrade: boolean;
}

export interface IClassModel extends Model<IClassDocument> { }

export const ClassModel = model<IClassDocument, IClassModel>("Class", classSchema);
