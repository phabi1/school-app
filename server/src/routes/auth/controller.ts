import Boom from "boom";
import { Request, ResponseToolkit } from "hapi";
import * as JWT from "jsonwebtoken";
import { UserModel } from "../../models/user";

interface ISigninPayload {
  email: string;
  password: string;
}

export class AuthController {
  public async signin(req: Request, h: ResponseToolkit): Promise<any> {
    const payload = req.payload as ISigninPayload;
    const user = await UserModel.findOne({ email: payload.email });

    if (user) {
      if (user.comparePassword(payload.password)) {
        const token = JWT.sign({
          uid: user.id,
        }, "secret");

        return { token };
      }
    }

    throw Boom.badData("Invalid credentials");
  }

}
