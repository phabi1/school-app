import { ServerRoute } from "hapi";
import * as controller from "./controller";

const routes: ServerRoute[] = [
  {
    path: "/users",
    method: "POST",
    options: {
      handler: controller.createUser,
    },
  },
];

export = routes;
