import Boom from "boom";
import { Request } from "hapi";
import { models } from "../../models";

export async function getProfile(req: Request): Promise<any> {
  const userId = (req.auth.credentials as any).uid;
  const user = await models.user.findById(userId);

  if (!user) {
    throw Boom.notFound();
  }

  return user;
}

export async function updateProfile(req: Request): Promise<any> {
  const userId = (req.auth.credentials as any).uid;
  const user = await models.user.findById(userId);

  if (!user) {
    throw Boom.notFound();
  }

  await user.save();
  return user;
}
