import * as Joi from "joi";

export const createValidator = {
  params: {
    classId: Joi.string().required(),
  },
  payload: {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    shortname: Joi.string().optional(),
    grade: Joi.string().required(),
    sex: Joi.string().valid("MALE", "FEMALE").optional(),
    birthday: Joi.date().optional(),
    notes: Joi.string().optional(),
  },
};

export const updateValidator = {
  params: {
    classId: Joi.string().required(),
    id: Joi.string().required(),
  },
  payload: {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    shortname: Joi.string().optional(),
    grade: Joi.string().required(),
    sex: Joi.string().valid("MALE", "FEMALE").optional(),
    birthday: Joi.date().optional(),
    notes: Joi.string().optional(),
  },
};
