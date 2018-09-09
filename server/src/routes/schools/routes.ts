import { ServerRoute } from "hapi";
import * as controller from "./controller";

const routes: ServerRoute[] = [
  {
    path: "/schools",
    method: "GET",
    options: {
      handler: controller.getSchools,
    },
  },
  {
    path: "/schools/:id",
    method: "GET",
    options: {
      handler: controller.getSchool,
    },
  },
  {
    path: "/schools",
    method: "POST",
    options: {
      handler: controller.createSchool,
    },
  },
  {
    path: "/schools/:id",
    method: "PUT",
    options: {
      handler: controller.updateSchool,
    },
  },
  {
    path: "/schools/:id",
    method: "DELETE",
    options: {
      handler: controller.deleteSchool,
    },
  },
];

export = routes;
