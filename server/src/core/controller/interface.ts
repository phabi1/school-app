import { Request, ResponseToolkit } from "hapi";

export interface IController {
  dispatch(): any;
}

export interface IControllerConstrutable {
  new(req: Request, h: ResponseToolkit): IController;
}
