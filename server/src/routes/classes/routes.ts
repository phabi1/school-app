import { ServerRoute } from "hapi";
import { ClassesController } from "./controller";
import { createValidator } from "./validators";

const routes: ServerRoute[] = [
  {
    path: "/classes/{id}",
    method: "GET",
    options: {
      handler: (req, h) => new ClassesController().dispatch(req, h),
    },
  },
  {
    path: "/classes",
    method: "POST",
    options: {
      handler: (req, h) => new ClassesController().dispatch(req, h),
      validate: createValidator,
    },
  },
];

export = routes;
