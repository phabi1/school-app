import { ServerRoute } from "hapi";

import {AuthController } from "./controller";

const controller = new AuthController();

const routes: ServerRoute[] = [
  {
    path: "/auth/signin",
    method: "POST",
    options: {
      handler: (req, h) => controller.signin(req, h),
      auth: false,
    },
  },
];

export = routes;
