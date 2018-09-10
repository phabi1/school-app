import Boom from "boom";
import { Request } from "hapi";
import Nconf from "nconf";
import { UserModel } from "../../models/user";

// tslint:disable-next-line:no-var-requires
const JWT = require("njwt");

interface ISigninPayload {
  email: string;
  password: string;
}

export async function signin(req: Request): Promise<any> {
  try {
    const payload = req.payload as ISigninPayload;
    const user = await UserModel.findOne({ email: payload.email });

    if (!user) {
      throw Boom.badData("Invalid credentials");
    }

    if (!user.comparePassword(payload.password)) {
      throw Boom.badData("Invalid credentials");
    }

    const jwt = JWT.create(
      {
        uid: user.id,
        iat: Date.now(),
      },
      Nconf.get("secret"),
      "HS256",
    );

    // tslint:disable-next-line:no-console
    console.log(Nconf.get("secret"));

    return { token: jwt.compact() };
  } catch (err) {

    // tslint:disable-next-line:no-console
    console.log(err);
    throw err;
  }
}
