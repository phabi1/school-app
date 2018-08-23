import { Document, Model } from "mongoose";

export interface ILevelDocument extends Document {
  name: string;
}

export interface ILevelModel extends Model<ILevelDocument> {}
