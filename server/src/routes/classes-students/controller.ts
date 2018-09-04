import Boom from "boom";
import { Types } from "mongoose";
import { RestControllerBase } from "../../core/controller/rest";
import { models } from "../../models";
import { IClassDocument } from "../../models/class";
import { IStudentDocument } from "../../models/student";

export class StudentsController extends RestControllerBase {

  protected async listAction() {
    const c = await this.ensureClass((this.req as any).params.classId);
    return c.students;
  }

  protected async createAction(payload: any) {
    const c = await this.ensureClass((this.req as any).params.classId);
    const student = {
      firstname: payload.firstname,
      lastname: payload.lastname,
      level: new Types.ObjectId(payload.level),
    } as IStudentDocument;

    if (payload.sex) {
      student.sex = payload.sex;
    }

    if (payload.birthday) {
      student.birthday = payload.birthday;
    }

    c.students.push(student);

    await c.save();

    return student;
  }

  protected async updateAction(id: string, data: any): Promise<IStudentDocument> {
    const c = await this.ensureClass((this.req as any).params.classId);
    const student = c.students.id(id);
    if (!student) {
      throw Boom.notFound();
    }

    await student.save();

    return student;
  }

  protected async ensureClass(id: string): Promise<IClassDocument> {
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
}
