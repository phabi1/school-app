import Boom from "boom";
import { Request, ResponseToolkit } from "hapi";
import * as JWT from "jsonwebtoken";
import { UserModel } from "../../models/user";

interface ISigninPayload {
  email: string;
  password: string;
}

export async function signin(req: Request): Promise<any> {
  const payload = req.payload as ISigninPayload;
  const user = await UserModel.findOne({ email: payload.email });

  if (!user) {
    throw Boom.badData("Invalid credentials");
  }

  if (!user.comparePassword(payload.password)) {
    throw Boom.badData("Invalid credentials");
  }

  const token = JWT.sign({
    uid: user.id,
  }, "secret");

  return { token };
}
