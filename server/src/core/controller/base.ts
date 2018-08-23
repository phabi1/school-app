import { Request, ResponseToolkit } from "hapi";
import { IController } from "./interface";

export abstract class ControllerBase implements IController {
  public dispatch(req: Request, h: ResponseToolkit) {
    return this.onDispatch(req, h);
  }

  protected abstract onDispatch(req: Request, h: ResponseToolkit): any;
}
