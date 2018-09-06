import * as Path from "path";
import { IAdapter } from "./interface";

export abstract class FileSystemAdapter implements IAdapter {

  public abstract getDirectoryPath(): string;
  public abstract getExternalUrl(uri: string): string;

  public getLocalPath(uri: string): string {
    return Path.join(this.getDirectoryPath(), this.getTarget(uri));
  }

  protected getTarget(uri: string): string {
    const [, target] = uri.split("://", 2);
    return target;
  }

}
