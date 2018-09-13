import { Server } from "hapi";
import { Options, ValidationResult } from "hapi-auth-jwt2";
import Nconf from "nconf";
import { models } from "../../models";

export async function register(server: Server) {

  const plugin = require("hapi-auth-jwt2");

  await server.register(plugin);

  const validateFunc = async (decoded: any): Promise<ValidationResult> => {

    const user = await models.user.findById(decoded.uid);

    if (!user) {
      return { isValid: false };
    }
    return { isValid: true };
  };

  const options: Options = {
    key: Nconf.get("secret"),
    tokenType: "Bearer",
    validate: validateFunc,
    verifyOptions: {
      algorithms: ["HS256"],
    },
  };

  server.auth.strategy("jwt", "jwt", options);

  server.auth.default("jwt");
}

export const name = "auth-jwt2";

export const multiple = false;
