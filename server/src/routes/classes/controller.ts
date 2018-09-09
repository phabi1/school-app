import Boom from "boom";
import { Request } from "hapi";
import { models } from "../../models";
import { IClassDocument } from "../../models/class";

export async function get(req: Request): Promise<IClassDocument> {
  try {
    const id = (req.params as any).id;
    const c = await models.class.findById(id).populate("grades");
    if (!c) {
      throw Boom.notFound();
    }
    return c;
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.error(err);
    throw err;
  }
}

export async function create(req: Request): Promise<IClassDocument> {
  const c = new models.class();
  try {
    await c.save();
    return c;
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.error(err);
    throw err;
  }
}
