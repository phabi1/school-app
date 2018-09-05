import Boom from "boom";
import { ResponseToolkit } from "hapi";
import * as Path from "path";
import { RestControllerBase } from "../../core/controller/rest";
import { models } from "../../models";
import { IClassDocument } from "../../models/class";
import { IStudentDocument } from "../../models/student";
import { classService } from "../../services/class";
import { fileService } from "../../services/file";
import { uploader } from "../../services/uploader";
import { UPLOAD_DIR } from "../../utils";

export class StudentsController extends RestControllerBase {

  protected async listAction() {
    const c = await this.ensureClass((this.req as any).params.classId);
    return c.students;
  }

  protected async createAction(payload: any) {
    const c = await this.ensureClass((this.req as any).params.classId);

    if (payload.pictureUrl) {
      const newPath = fileService.move(payload.pictureUrl, Path.join("private", "students", "pictures"));
      payload.pictureUrl = newPath;
    }

    const student = await classService.addStudentInClass(c, payload);

    return student;
  }

  protected async updateAction(id: string, payload: any): Promise<IStudentDocument> {
    const c = await this.ensureClass((this.req as any).params.classId);
    let student = c.students.id(id);
    if (!student) {
      throw Boom.notFound();
    }

    if (payload.pictureUrl) {
      const newPath = fileService.move(payload.pictureUrl, "private/students/pictures");
      payload.pictureUrl = newPath;
    }

    student = await classService.updateStudentInClass(c, student, payload);

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

  protected async getPictureAction() {
    const pictureId = (this.req as any).params.pictureId;
    if (!pictureId) {
      throw Boom.notFound();
    }
    return (this.h as ResponseToolkit).file(Path.join(UPLOAD_DIR, "students", "pictures", pictureId));
  }

  protected async uploadPictureAction() {
    try {
      const data = (this.req as any).payload as any;
      const file = data.file;
      const fileDetails = await uploader(file, { dest: Path.join(UPLOAD_DIR) });
      return fileDetails;
    } catch (err) {
      throw Boom.badRequest(err.message, err);
    }
  }
}
