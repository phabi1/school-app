import { Request, ResponseToolkit } from "hapi";
import { IController } from "./interface";

export abstract class ControllerBase implements IController {

  protected req: Request;
  protected h: ResponseToolkit;

  constructor(req: Request, h: ResponseToolkit) {
    this.req = req;
    this.h = h;
  }

  public dispatch() {
    return this.onDispatch();
  }

  protected abstract onDispatch(): any;
}
