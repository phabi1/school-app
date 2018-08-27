import Command from "commander";

Command.command("create")
  .alias("c")
  .description("Create user")
  .parse(process.argv);
