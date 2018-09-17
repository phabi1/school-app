import { ClassModel } from "./class";
import { GradeModel } from "./grade";
import { schoolModel } from "./school";
import { UserModel } from "./user";

export const models = {
  grades: GradeModel,
  school: schoolModel,
  class: ClassModel,
  level: GradeModel,
  user: UserModel,
};
