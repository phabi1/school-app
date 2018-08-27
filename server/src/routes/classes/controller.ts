import { RestControllerBase } from "../../core/controller/rest";
import { ClassModel, IClassDocument } from "../../models/class";

export class ClassesController extends RestControllerBase {
  protected async createAction(payload: any): Promise<IClassDocument> {
    const user = new ClassModel();
    try {
      await user.save();
      return user;
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
      throw err;
    }
  }
}
