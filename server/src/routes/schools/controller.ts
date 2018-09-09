import Boom from "boom";
import { Request } from "hapi";
import { models } from "../../models";

export async function getSchools() {
  return await models.school.find();
}

export async function getSchool(req: Request) {
  const params = req.params;
  const schoolId = params.id;

  const school = await models.school.find(schoolId);
  if (!school) {
    throw Boom.notFound();
  }

  return school;
}

export async function createSchool(req: Request) {
  const payload = req.payload as any;
  const school = new models.school(payload);

  await school.save();

  return school;
}

export async function updateSchool(req: Request) {
  const params = req.params;
  const schoolId = params.id;
  const school = await models.school.findById(schoolId);

  if (!school) {
    throw Boom.notFound();
  }

  await school.save();

  return school;
}

export async function deleteSchool(req: Request) {
  const params = req.params;
  const schoolId = params.id;
  return await models.school.remove(schoolId);
}
