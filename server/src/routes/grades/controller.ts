import { Request } from "hapi";
import { models } from "../../models";

export async function getGrades(req: Request) {
  const query = req.query as { parent?: string };

  const q = models.grades.find();

  if (query.parent) {
    q.where({ parent: query.parent });
  }

  return await q;
}
