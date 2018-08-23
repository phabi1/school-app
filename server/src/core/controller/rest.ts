import Boom from "boom";
import { Request, ResponseToolkit } from "hapi";
import { ControllerBase } from "./base";

export abstract class RestControllerBase extends ControllerBase {

  [key: string]: any;

  private action: string | null = null;
  private identifierKey: string = "id";

  public dispatch(req: Request, h: ResponseToolkit, action?: string) {
    if (action) {
      this.action = action;
    }
    return super.dispatch(req, h);
  }

  protected async onDispatch(req: Request, h: ResponseToolkit) {
    if (this.action) {
      return this[this.action + "Action"]();
    } else {
      const method = req.method.toUpperCase();

      const identifier = (req.params as any)[this.identifierKey];

      switch (method) {
        case "GET":
          if (identifier) {
            return await this.getAction(identifier);
          } else {
            return await this.listAction();
          }
        case "POST":
          return await this.createAction(req.payload);
        case "PUT":
          return await this.updateAction(identifier, req.payload);
        case "DELETE":
          return await this.deleteAction(identifier);
        default:
          throw Boom.notFound();
      }

    }
  }

  protected listAction() {
    throw Boom.notImplemented();
  }

  protected getAction(id: string) {
    throw Boom.notImplemented();
  }

  protected createAction(payload: any) {
    throw Boom.notImplemented();
  }

  protected updateAction(id: string, payload: any) {
    throw Boom.notImplemented();
  }

  protected deleteAction(id: string) {
    throw Boom.notImplemented();
  }
}
