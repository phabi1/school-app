import * as Fs from "fs";
import * as Path from "path";
import Sharp from "sharp";
import Uuid from "uuid";
import { fileService } from "./file";

export interface IFileUploaderOptions {
  dest: string;
}

export interface IFileDetails {
  originalName: string;
  filename: string;
  path: string;
  url: string;
  mimeType: string;
  size: number;
}

export async function uploader(file: any, options: IFileUploaderOptions) {
  if (!file) { throw new Error("no file(s)"); }

  return _fileHandler(file, options);
}

function _fileHandler(file: any, options: IFileUploaderOptions): Promise<any> {
  const originalName = file.hapi.filename;

  const extension = Path.extname(originalName);
  const filename = Uuid.v1() + extension;

  fileService.prepareDirectory(options.dest);
  const uri = options.dest + filename;
  const filepath = fileService.getFilePath(uri);
  const fileStream = Fs.createWriteStream(filepath);

  return new Promise((resolve, reject) => {

    file.on("error", (err: any) => { reject(err); });

    file.pipe(fileStream);

    file.on("end", (err: any) => {
      const fileDetails: IFileDetails = {
        originalName,
        filename,
        mimeType: file.hapi.headers["content-type"],
        path: uri,
        url: fileService.createExternalUrl(uri),
        size: fileService.getFileSize(uri),
      };
      resolve(fileDetails);
    });
  });
}
