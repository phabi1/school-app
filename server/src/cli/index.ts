import Commander from "commander";

Commander.version("1.0.0")
  .command("user", "User management")
  .alias("u")
  .parse(process.argv);
