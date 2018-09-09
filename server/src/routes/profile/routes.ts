import { ServerRoute } from "hapi";
import * as controller from "./controller";

const routes: ServerRoute[] = [
  {
    path: "/profile",
    method: "GET",
    options: {
      handler: controller.getProfile,
    },
  },
  {
    path: "/profile",
    method: "PUT",
    options: {
      handler: controller.updateProfile,
    },
  },
];

export = routes;
