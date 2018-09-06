import { FileSystemAdapter } from "./fs";

export class PrivateAdapter extends FileSystemAdapter {

  public getExternalUrl(uri: string): string {
    return "http://localhost:3000/private/" + this.getTarget(uri);
  }

  public getDirectoryPath(): string {
    return "private";
  }
}
