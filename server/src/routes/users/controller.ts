import { RestControllerBase } from "../../core/controller/rest";
import { IUserDocument, UserModel } from "../../models/user";

export class UsersController extends RestControllerBase {
  protected async createAction(payload: any): Promise<IUserDocument> {
    const user = new UserModel();
    user.email = payload.email;
    user.name = payload.email;
    user.pass = payload.password;
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
