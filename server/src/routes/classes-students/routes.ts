import { ServerRoute } from "hapi";
import { StudentsController } from "./controller";
import { createValidator, updateValidator } from "./validators";

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
      validate: createValidator,
    },
  },
  {
    path: "/classes/{classId}/students/{id}",
    method: "PUT",
    options: {
      handler: (req, h) => new StudentsController().dispatch(req, h),
      validate: updateValidator,
    },
  },
  {
    path: "/classes/{classId}/students/{id}",
    method: "DELETE",
    options: {
      handler: (req, h) => new StudentsController().dispatch(req, h),
    },
  },
  {
    path: "/classes/students/picture/{pictureId}",
    method: "GET",
    options: {
      handler: (req, h) => new StudentsController().dispatch(req, h, "getPicture"),
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
      handler: (req, h) => new StudentsController().dispatch(req, h, "uploadPicture"),
    },
  },
];

export = routes;
