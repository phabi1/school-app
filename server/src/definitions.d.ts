import "hapi";
import { Connection, Mongoose } from "mongoose";

declare module "hapi" {
  
  export interface PluginProperties {
    mongoose: {
      connection: Connection,
      lib: Mongoose,
    }
  }

}

declare module "joi" {
  export interface JoiObject {
    objectId(): any
  }
}