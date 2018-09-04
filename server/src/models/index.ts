import { ClassModel } from "./class";
import { LevelModel } from "./grade";
import { schoolModel } from "./school";
import { UserModel } from "./user";

export const models = {
  school: schoolModel,
  class: ClassModel,
  level: LevelModel,
  user: UserModel,
};
