import { ServerRoute } from "hapi";
import * as controller from "./controller";

const routes: ServerRoute[] = [
  {
    path: "/generate/{generator}",
    method: "POST",
    options: {
      handler: controller.trombinoscope,
      auth: false,
    },
  },
];

export = routes;
