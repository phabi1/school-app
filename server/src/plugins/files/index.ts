import { Server } from "hapi";
import { fileService } from "../../services/file";
import { PrivateAdapter } from "../../services/file/adapter/private";
import { PublicAdapter } from "../../services/file/adapter/public";
import { TemporaryAdapter } from "../../services/file/adapter/temporary";

interface IPluginOptions {
  uri: string;
}

export async function register(server: Server, options: IPluginOptions) {
  fileService.use("temporary", TemporaryAdapter);
  fileService.use("private", PrivateAdapter);
  fileService.use("public", PublicAdapter);
}

export const name = "files";

export const multiple = false;
