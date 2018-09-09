import Boom from "boom";
import { ControllerBase } from "./base";

export abstract class RestControllerBase extends ControllerBase {

  [key: string]: any;

  private action: string | null = null;
  private identifierKey: string = "id";

  public dispatch(action?: string) {
    if (action) {
      this.action = action;
    }
    return super.dispatch();
  }

  protected async onDispatch() {
    if (this.action) {
      return this[this.action + "Action"]();
    } else {
      const method = this.req.method.toUpperCase();

      const identifier = (this.req.params as any)[this.identifierKey];

      switch (method) {
        case "GET":
          if (identifier) {
            return await this.getAction(identifier);
          } else {
            return await this.listAction();
          }
        case "POST":
          return await this.createAction(this.req.payload);
        case "PUT":
          return await this.updateAction(identifier, this.req.payload);
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
