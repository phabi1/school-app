import * as Fs from "fs";
import * as Path from "path";
import { IAdapter, IAdapterConstructable } from "./file/adapter/interface";

class FileService {

  private adapters: { [key: string]: IAdapterConstructable };

  constructor() {
    this.adapters = {};
  }

  public use(scheme: string, adapter: IAdapterConstructable) {
    this.adapters[scheme] = adapter;
  }

  public move(source: string, destination: string): string {
    // Check if destination exists
    this.prepareDirectory(destination);

    const sourcePath = this.getInstanceByUri(source).getLocalPath(source);
    const destinationPath = this.getInstanceByUri(destination).getLocalPath(destination);

    const basename = Path.basename(sourcePath);
    const filename = Path.join(destinationPath, basename);

    Fs.renameSync(sourcePath, filename);

    return destination + "/" +  basename;
  }

  public prepareDirectory(uri: string) {
    const adapter = this.getInstanceByUri(uri);

    const folders = adapter.getLocalPath(uri).split(Path.sep);

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

  public createExternalUrl(uri: string): string {
    const adapter = this.getInstanceByUri(uri);
    return adapter.getExternalUrl(uri);
  }

  public getFilePath(uri: string): string {
    const adapter = this.getInstanceByUri(uri);
    return adapter.getLocalPath(uri);
  }

  public getFileSize(uri: string): number {
    const adapter = this.getInstanceByUri(uri);
    try {
      const stats = Fs.statSync(adapter.getLocalPath(uri));
      return stats.size;
    } catch (err) {
      return 0;
    }
  }

  private uriScheme(uri: string): string {
    const scheme = uri.substr(0, uri.indexOf("://"));
    if (!scheme) {
      throw new Error("Invalid uri format");
    }
    return scheme;
  }

  private getInstanceByUri(uri: string): IAdapter {
    const scheme = this.uriScheme(uri);
    return this.getInstanceByScheme(scheme);
  }

  private getInstanceByScheme(scheme: string): IAdapter {
    const instance = new this.adapters[scheme]();
    return instance;
  }
}

export const fileService = new FileService();
