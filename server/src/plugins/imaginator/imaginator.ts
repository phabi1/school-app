import * as Fs from "fs";
import * as Path from "path";
import Sharp from "sharp";

export class Imaginator {

  private presets: { [key: string]: any[] };

  constructor() {
    this.presets = {};
  }

  public use(preset: string, actions: any[]) {
    this.presets[preset] = actions;
  }

  public async run(presetName: string, path: string): Promise<string> {

    const source = Path.join("public", path);
    const destination = Path.join("public", "image", presetName, path);

    // Prepare directory
    this.prepareDirectory(Path.dirname(destination));

    const preset = this.presets[presetName];

    const instance = await Sharp(source);
    // for (let a of preset) {
    //   instance[a]();
    // }
    await instance.toFile(destination);
    return destination;
  }

  private prepareDirectory(directory: string) {
    const paths = directory.split(Path.sep);
    paths.reduce((path, current) => {

      const p = Path.join(path, current);

      let isDir = false;
      try {
        isDir = Fs.statSync(p).isDirectory();
      } catch {
        isDir = false;
      }

      if (!isDir) {
        Fs.mkdirSync(p);
      }

      return p;
    });
  }

}

export const imaginator = new Imaginator();
