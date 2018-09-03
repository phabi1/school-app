import * as Joi from "joi";

export const createValidator = {
  payload: {
    firstname: Joi.string().lowercase().required(),
    lastname: Joi.string().lowercase().required(),
    level: Joi.string().required(),
    shortname: Joi.string().lowercase().optional(),
    sex: Joi.string().valid("MALE", "FEMALE").optional(),
    birthday: Joi.date().optional(),
  },
};
