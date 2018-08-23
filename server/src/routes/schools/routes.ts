import { ServerRoute } from "hapi";
import { SchoolsController } from "./controller";

const routes: ServerRoute[] = [
  {
    path: "/schools",
    method: "GET",
    options: {
      handler: (req, h) => new SchoolsController().dispatch(req, h),
    },
  },
  {
    path: "/schools/:id",
    method: "GET",
    options: {
      handler: (req, h) => new SchoolsController().dispatch(req, h),
    },
  },
  {
    path: "/schools",
    method: "POST",
    options: {
      handler: (req, h) => new SchoolsController().dispatch(req, h),
    },
  },
  {
    path: "/schools/:id",
    method: "PUT",
    options: {
      handler: (req, h) => new SchoolsController().dispatch(req, h),
    },
  },
  {
    path: "/schools/:id",
    method: "DELETE",
    options: {
      handler: (req, h) => new SchoolsController().dispatch(req, h),
    },
  },
];

export = routes;
