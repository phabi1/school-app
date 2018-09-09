import { ServerRoute } from "hapi";
import * as controller from "./controller";
import { createValidator } from "./validators";

const routes: ServerRoute[] = [
  {
    path: "/classes/{id}",
    method: "GET",
    options: {
      handler: controller.get,
    },
  },
  {
    path: "/classes",
    method: "POST",
    options: {
      handler: controller.create,
      validate: createValidator,
    },
  },
];

export = routes;
