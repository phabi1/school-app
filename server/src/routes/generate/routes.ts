import { ServerRoute } from "hapi";
import * as controller from "./controller";

const routes: ServerRoute[] = [
  {
    path: "/generate/trombinoscope",
    method: "GET",
    options: {
      handler: controller.trombinoscope,
      auth: false,
    },
  },
];

export = routes;
