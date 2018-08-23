import { Server } from "hapi";
import { Options, ValidationResult } from "hapi-auth-jwt2";
import { UserModel } from "../../models/user";

export async function register(server: Server) {

  const plugin = require("hapi-auth-jwt2");

  await server.register(plugin);

  const validateFunc = async (decoded: any): Promise<ValidationResult> => {

    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return { isValid: false };
    }
    return { isValid: true };
  };

  const options: Options = {
    key: "secret",
    validate: validateFunc,
    verifyOptions: {
      algorithms: ["H256"],
    },
  };

  server.auth.strategy("jwt", "jwt", options);
}

export const name = "auth-jwt2";

export const multiple = false;
