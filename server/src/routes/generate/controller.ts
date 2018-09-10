import { Request, ResponseToolkit } from "hapi";
import * as Path from "path";
import { IGeneratorConstructable } from "../../generators/interface";
import { ROOT_DIR } from "../../utils";

export async function trombinoscope(req: Request, h: ResponseToolkit) {

  const params = req.params;

  const generator: IGeneratorConstructable = require(Path.join(ROOT_DIR, "generators", params.generator)).default;

  const instance = new generator();

  const options = req.payload;
  return instance.generate(options)
    .then((result) => h.response(result.content).header("Content-Type", "application/pdf"))
    // tslint:disable-next-line:no-console
    .catch((err) => console.log(err));
}
