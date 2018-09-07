import { Types } from "mongoose";
import { IClassDocument } from "../models/class";
import { IStudentDocument } from "../models/student";

function prop<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

class ClassService {

  public async addStudentInClass(c: IClassDocument, data: Partial<IStudentDocument>): Promise<IStudentDocument> {
    const student: any = {
      _id: new Types.ObjectId(),
    };

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value: any = (data as any)[key];
        student[key] = value;
      }
    }

    c.students.push(student);
    await c.save();

    return c.students.id(student._id);
  }

  public async updateStudentInClass(
    c: IClassDocument,
    student: IStudentDocument,
    data: Partial<IStudentDocument>,
  ): Promise<IStudentDocument> {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value: any = (data as any)[key];
        student.set(key, value);
      }
    }
    await c.save();
    return student;
  }

  public async deleteStudentInClass(c: IClassDocument, student: IStudentDocument): Promise<IStudentDocument> {
    c.students.pull(student);
    await c.save();
    return student;
  }

}

export const classService = new ClassService();
