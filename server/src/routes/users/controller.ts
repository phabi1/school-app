import { Request } from "hapi";
import { models } from "../../models";

export async function createUser(req: Request) {
  const payload = req.payload as any;
  const user = new models.user(payload);

  await user.save();

  return user;
}
