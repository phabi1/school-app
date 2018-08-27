import Commander from "commander";

Commander.option("-e", "--email <email>", "Email")
  .action(() => {
    // tslint:disable-next-line:no-console
    console.log("User created");

  })
  .parse(process.argv);
