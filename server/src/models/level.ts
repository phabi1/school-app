import { Document, Model, model } from "mongoose";
import { levelSchema } from "./schemas/level";

export interface ILevelDocument extends Document {
  name: string;
}

export interface ILevelModel extends Model<ILevelDocument> {}

export const LevelModel = model<ILevelDocument, ILevelModel>("Level", levelSchema);
