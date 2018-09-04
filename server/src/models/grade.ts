import { Document, Model, model } from "mongoose";
import { gradeSchema } from "./schemas/grade";

export interface IGradeDocument extends Document {
  name: string;
}

export interface IGradeModel extends Model<IGradeDocument> {}

export const LevelModel = model<IGradeDocument, IGradeModel>("Grade", gradeSchema);
