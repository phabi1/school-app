import * as Fs from "fs";
import * as Path from "path";

class FileService {

  public move(source: string, destination: string): string {
    // Check if destination exists
    this.prepareDirectory(destination);

    const basename = Path.basename(source);
    const filename = Path.join(destination, basename);

    Fs.renameSync(source, filename);

    return filename;
  }

  public prepareDirectory(directory: string) {
    const folders = directory.split(Path.sep);

    let path = "";
    for (const folder of folders) {
      let isDir = false;

      path = Path.join(path, folder);

      try {
        isDir = Fs.statSync(path).isDirectory();
      } catch (err) {
        isDir = false;
      }

      if (!isDir) {
        Fs.mkdirSync(path);
      }
    }
  }
}

export const fileService = new FileService();
