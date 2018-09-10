import * as Glue from "glue";
import { Server } from "hapi";
import Nconf from "nconf";
import { ROOT_DIR } from "./utils";

Nconf.argv().env().file(
  { file: "config/configuration.development.json" },
);

const manifest: Glue.Manifest = {
  server: {
    port: 3000,
    routes: {
      cors: {
        origin: "ignore",
      },
    },
  },
  register: {
    plugins: [
      {
        plugin: "good",
        options: {
          ops: {
            interval: 1000,
          },
          reporters: {
            myConsoleReporter: [
              {
                module: "good-squeeze",
                name: "Squeeze",
                args: [{ log: "*", response: "*" }],
              },
              {
                module: "good-console",
              },
              "stdout",
            ],
          },
        },
      },
      {
        plugin: "inert",
      },
      {
        plugin: "./plugins/db",
        options: {
          uri: "mongodb://dev:dev@localhost:27017/school?authSource=admin",
        },
      },
      "./plugins/jwt",
      {
        plugin: "hapi-router",
        options: {
          routes: "dist/routes/**/routes.js",
        },
      },
      "./plugins/files",
    ],
  },
};

const options: Glue.Options = {
  relativeTo: ROOT_DIR,
};

const init = async () => {
  try {
    const server: Server = await Glue.compose(manifest, options);

    await server.start();

    // tslint:disable-next-line:no-console
    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.log(err);
    process.exit(1);
  }
};

init();
