import Boom from "boom";
import { Types } from "mongoose";
import { RestControllerBase } from "../../core/controller/rest";
import { models } from "../../models";
import { IClassDocument } from "../../models/class";
import { IStudent } from "../../models/student";

export class StudentsController extends RestControllerBase {

  protected async listAction() {
    const c = await this.ensureClass((this.req as any).params.classId);
    return c.students;
  }

  protected async createAction(payload: any) {
    const c = await this.ensureClass((this.req as any).params.classId);
    const student: IStudent = {
      firstname: payload.firstname,
      lastname: payload.lastname,
      level: new Types.ObjectId(payload.level),
    };

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
