import { ServerRoute } from "hapi";
import * as controller from "./controller";

const routes: ServerRoute[] = [
  {
    path: "/grades",
    method: "GET",
    options: {
      handler: controller.getGrades,
    },
  },
];

export = routes;
