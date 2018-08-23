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