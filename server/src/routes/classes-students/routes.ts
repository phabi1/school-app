import { ServerRoute } from "hapi";
import { StudentsController } from "./controller";

const routes: ServerRoute[] = [
  {
    path: "/classes/{classId}/students",
    method: "GET",
    options: {
      handler: (req, h) => new StudentsController().dispatch(req, h),
    },
  },
  {
    path: "/classes/{classId}/students",
    method: "POST",
    options: {
      handler: (req, h) => new StudentsController().dispatch(req, h),
    },
  },
  {
    path: "/classes/{classId}/students/{id}",
    method: "PUT",
    options: {
      handler: (req, h) => new StudentsController().dispatch(req, h),
    },
  },
  {
    path: "/classes/{classId}/students/{id}",
    method: "DELETE",
    options: {
      handler: (req, h) => new StudentsController().dispatch(req, h),
    },
  },
];

export = routes;
