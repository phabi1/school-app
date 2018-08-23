import { Server } from "hapi";
import { connect } from "mongoose";

interface IPluginOptions {
  uri: string;
}

export async function register(server: Server, options: IPluginOptions) {
  await connect(options.uri);
}

export const name = "db";

export const multiple = false;
