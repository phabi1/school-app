import { Request, ResponseToolkit } from "hapi";
import { IController } from "./interface";

export abstract class ControllerBase implements IController {

  protected req?: Request;
  protected h?: ResponseToolkit;

  public dispatch(req: Request, h: ResponseToolkit) {
    this.req = req;
    this.h = h;
    return this.onDispatch(req, h);
  }

  protected abstract onDispatch(req: Request, h: ResponseToolkit): any;
}
