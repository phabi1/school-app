import { FileSystemAdapter } from "./fs";

export class TemporaryAdapter extends FileSystemAdapter {

  public getExternalUrl(uri: string): string {
    return "http://localhost:3000/temporary/" + this.getTarget(uri);
  }

  public getDirectoryPath(): string {
    return "tmp";
  }
}
