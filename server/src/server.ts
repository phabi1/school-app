import * as Hapi from "hapi";

const server = new Hapi.Server({
  // host: "localhost",
  port: 3000,
});

const init = async () => {

  server.route({
    path: "/",
    method: "GET",
    handler: () => {
      return { message: "Welcome to API" };
    },
  });

  await server.start();
  // tslint:disable-next-line:no-console
  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  // tslint:disable-next-line:no-console
  console.log(err);
  process.exit(1);
});

init();
