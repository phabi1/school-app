import { FileSystemAdapter } from "./fs";

export class PublicAdapter extends FileSystemAdapter {

  public getExternalUrl(uri: string): string {
    return "http://localhost:3000/public/" + this.getTarget(uri);
  }

  public getDirectoryPath(): string {
    return "public";
  }
}
