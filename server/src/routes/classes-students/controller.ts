import Boom from "boom";
import { RestControllerBase } from "../../core/controller/rest";
import { ClassModel } from "../../models/class";

export class StudentsController extends RestControllerBase {

  protected async createAction(payload: any) {
    await this.ensureClass("");
  }

  protected async ensureClass(id: string) {
    try {
      const c = await ClassModel.findById(id);
      if (!c) {
        throw Boom.notFound();
      }
    }
    catch (err) {
      throw err;
    }

  }
}
