import { Document, Model, Types } from "mongoose";
import { ILevelDocument } from "./level";
import { ISchoolDocument } from "./school";
import { IStudentDocument } from "./student";
import { ITeacherDocument } from "./teacher";

export interface IClassDocument extends Document {
  start: Date;
  end: Date;
  teacher: Types.ObjectId | ITeacherDocument;
  students: Types.ObjectId[] | IStudentDocument[];
  school: Types.ObjectId | ISchoolDocument;
  levels: Types.ObjectId[] | ILevelDocument[];
  hasMutipleLevel: boolean;
}

export interface ISchoolModel extends Model<IClassDocument> { }
