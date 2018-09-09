import Boom from "boom";
import { Request, ResponseToolkit } from "hapi";
import { Types } from "mongoose";
import { models } from "../../models";
import { IClassDocument } from "../../models/class";
import { IStudentDocument } from "../../models/student";
import { classService } from "../../services/class";
import { fileService } from "../../services/file";
import { uploader } from "../../services/uploader";

export async function getStudents(req: Request) {
  const params = req.params;
  const c = await ensureClass(params.classId);
  return c.students;
}

export async function createStudent(req: Request) {
  const params = req.params;
  const payload = req.payload as any;
  const c = await ensureClass(params.classId);

  if (payload.picture) {
    const newPath = fileService.move(payload.picture, "private://students/pictures");
    payload.picture = newPath;
  }

  const student = await classService.addStudentInClass(c, payload);

  return student;
}

export async function updateStudent(req: Request): Promise<IStudentDocument> {
  const params = req.params;
  const payload = req.payload as any;
  const c = await ensureClass(params.classId);
  let student = c.students.id(params.id);
  if (!student) {
    throw Boom.notFound();
  }

  if (payload.picture) {
    const newPath = fileService.move(payload.picture, "private://students/pictures");
    payload.picture = newPath;
  }

  student = await classService.updateStudentInClass(c, student, payload);

  return student;
}

export async function deleteStudent(req: Request): Promise<IStudentDocument> {
  const params = req.params;
  const c = await ensureClass(params.classId);
  let student = c.students.id(params.id);

  if (!student) {
    throw Boom.notFound();
  }

  student = await classService.deleteStudentInClass(c, student);

  return student;
}

export async function getStudentPicture(req: Request, h: ResponseToolkit) {
  const params = req.params;
  const studentId = params.studentId;

  const c = await models.class.findOne({ "students._id": new Types.ObjectId(studentId) });
  if (!c) {
    throw Boom.notFound();
  }
  const student = c.students.id(studentId);
  if (!student) {
    throw Boom.notFound();
  }

  let picture = student.picture;
  if (!picture) {
    switch (student.sex) {
      case "MALE":
        picture = "public://students/pictures/boy.png";
        break;
      case "FEMALE":
        picture = "public://students/pictures/girl.png";
        break;

      default:
        picture = "public://students/pictures/default.png";
        break;
    }
  }

  const filepath = fileService.getFilePath(picture);
  return h.file(filepath);
}

export async function uploadStudentPicture(req: Request) {
  try {
    const payload = req.payload as any;
    const file = payload.file;
    const fileDetails = await uploader(file, { dest: "temporary://" });
    return fileDetails;
  } catch (err) {
    throw Boom.badRequest(err.message, err);
  }
}

async function ensureClass(id: string): Promise<IClassDocument> {
  try {
    const c = await models.class.findById(id);
    if (!c) {
      throw Boom.notFound();
    }
    return c;
  } catch (err) {
    throw err;
  }

}
