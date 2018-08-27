import { ServerRoute } from "hapi";
import { StudentsController } from "./controller";

const routes: ServerRoute[] = [
  {
    path: "/classes/:class/students",
    method: "GET",
    options: {
      handler: (req, h) => new StudentsController().dispatch(req, h),
    },
  },
  {
    path: "/classes/:class/students",
    method: "POST",
    options: {
      handler: (req, h) => new StudentsController().dispatch(req, h),
    },
  },
  {
    path: "/classes/:class/students/:id",
    method: "PUT",
    options: {
      handler: (req, h) => new StudentsController().dispatch(req, h),
    },
  },
  {
    path: "/classes/:class/students/:id",
    method: "DELETE",
    options: {
      handler: (req, h) => new StudentsController().dispatch(req, h),
    },
  },
];

export = routes;