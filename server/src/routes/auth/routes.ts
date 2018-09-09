import { ServerRoute } from "hapi";

import * as controller from "./controller";

const routes: ServerRoute[] = [
  {
    path: "/auth/signin",
    method: "POST",
    options: {
      handler: controller.signin,
      auth: false,
    },
  },
];

export = routes;
