import * as Fs from "fs";
import * as Path from "path";
import Uuid from "uuid";
import { fileService } from "./file";

export interface IFileUploaderOptions {
  dest: string;
}

export interface IFileDetails {
  originalName: string;
  fileName: string;
  destination: string;
  path: string;
  mimeType: string;
  size: number;
}

export async function uploader(file: any, options: IFileUploaderOptions) {
  if (!file) { throw new Error("no file(s)"); }

  return _fileHandler(file, options);
}

function _fileHandler(file: any, options: IFileUploaderOptions): Promise<any> {
  const originalName = file.hapi.filename;
  const fileName = Uuid.v1();

  fileService.prepareDirectory(options.dest);

  const path = Path.join(options.dest, fileName);
  const fileStream = Fs.createWriteStream(path);
  return new Promise((resolve, reject) => {

    file.on("error", (err: any) => { reject(err); });

    file.pipe(fileStream);

    file.on("end", (err: any) => {
      const fileDetails: IFileDetails = {
        originalName,
        fileName,
        mimeType: file.hapi.headers["content-type"],
        destination: options.dest,
        path,
        size: Fs.statSync(path).size,
      };
      resolve(fileDetails);
    });
  });
}
