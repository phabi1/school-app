import { Server } from "hapi";
import * as controller from "./controller";

export async function register(server: Server) {

  await server.dependency("inert");

  server.route({
    path: "/image/{name}/{path*}",
    method: "GET",
    options: {
      handler: controller.getImage,
      auth: false,
    },
  });

}

export const name = "imaginator";

export const multiple = false;
