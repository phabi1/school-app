import { Request, ResponseToolkit } from "hapi";

export interface IController {
  dispatch(req: Request, h: ResponseToolkit): any;
}
