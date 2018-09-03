import Boom from "boom";
import { RestControllerBase } from "../../core/controller/rest";
import { models } from "../../models";
import { IClassDocument } from "../../models/class";

export class ClassesController extends RestControllerBase {

  protected async getAction(id: string): Promise<IClassDocument> {
    try {
      const c = await models.class.findById(id).populate("levels");
      if (!c) {
        throw Boom.notFound();
      }
      return c;
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
      throw err;
    }
  }

  protected async createAction(payload: any): Promise<IClassDocument> {
    const c = new models.class();
    try {
      await c.save();
      return c;
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
      throw err;
    }
  }
}
