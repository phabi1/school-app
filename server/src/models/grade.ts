import { Document, Model, model } from "mongoose";
import { gradeSchema } from "./schemas/grade";

export interface IGradeDocument extends Document {
  title: string;
  name: string;
  weight: number;
}

export interface IGradeModel extends Model<IGradeDocument> {}

export const GradeModel = model<IGradeDocument, IGradeModel>("Grade", gradeSchema);
