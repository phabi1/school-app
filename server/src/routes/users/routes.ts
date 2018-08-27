import { ServerRoute } from "hapi";
import { UsersController } from "./controller";

const routes: ServerRoute[] = [
  {
    path: "/users",
    method: "POST",
    options: {
      handler: (req, h) => new UsersController().dispatch(req, h),
    },
  },
];

export = routes;
