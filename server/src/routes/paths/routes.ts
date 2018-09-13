import { ServerRoute } from "hapi";
import * as Path from "path";
import { PRIVATE_DIR, PUBLIC_DIR, TMP_DIR } from "../../utils";

const routes: ServerRoute[] = [
  {
    path: "/temporary/{path*}",
    method: "GET",
    options: {
      handler: (req, h) => {
        const path = (req.params as any).path;
        return h.file(Path.join(TMP_DIR, path));
      },
      auth: false,
    },
  },
  {
    path: "/public/{path*}",
    method: "GET",
    options: {
      handler: (req, h) => {
        const path = (req.params as any).path;
        return h.file(Path.join(PUBLIC_DIR, path));
      },
      auth: false,
    },
  },
  {
    path: "/private/{path*}",
    method: "GET",
    options: {
      handler: (req, h) => {
        const path = (req.params as any).path;
        return h.file(Path.join(PRIVATE_DIR, path));
      },
      auth: false,
    },
  },
];

export = routes;
