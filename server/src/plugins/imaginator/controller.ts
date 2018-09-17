import * as Fs from "fs";
import { Request, ResponseToolkit } from "hapi";
import * as Path from "path";
import Sharp from "sharp";
import { fileService } from "../../services/file";
import { ROOT_DIR } from "../../utils";
import { imaginator } from "./imaginator";

export async function getImage(req: Request, h: ResponseToolkit) {
  const preset = req.params.name;
  const url = req.params.path;

  const uri = "public://image/" + preset + "/" + url;

  const filepath = fileService.getFilePath(uri);
  if (Fs.existsSync(filepath)) {
    return h.file(filepath);
  } else {
    try {

      const destination = await imaginator.run(preset, url);

      return h.file(destination);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.log(err);
      throw err;
    }
  }
}
