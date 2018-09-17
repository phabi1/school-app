import { ServerRoute } from "hapi";
import * as controller from "./controller";
import { createValidator, updateValidator } from "./validators";

const routes: ServerRoute[] = [
  {
    path: "/classes/{classId}/students",
    method: "GET",
    options: {
      handler: controller.getStudents,
    },
  },
  {
    path: "/classes/{classId}/students",
    method: "POST",
    options: {
      handler: controller.createStudent,
      validate: createValidator,
    },
  },
  {
    path: "/classes/{classId}/students/{id}",
    method: "PUT",
    options: {
      handler: controller.updateStudent,
      validate: updateValidator,
    },
  },
  {
    path: "/classes/{classId}/students/{id}",
    method: "DELETE",
    options: {
      handler: controller.deleteStudent,
    },
  },
  {
    path: "/classes/students/picture",
    method: "POST",
    options: {
      payload: {
        output: "stream",
        allow: "multipart/form-data",
      },
      handler: controller.uploadStudentPicture,
      auth: false,
    },
  },
];

export = routes;
