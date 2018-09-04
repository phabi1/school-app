import { ObjectId } from "bson";
import * as Joi from "joi";

Joi.extend({
  name: "objectId",
  base: Joi.string(),
  language: {
    base: "must be a valid ObjectId",
  },
  pre(value, state, options) {
    if (!ObjectId.isValid(value)) {
      return this.createError("objectId.base", {value}, state, options);
    }
    if (options.convert) {
      return new ObjectId(value);
    }

    return true;
  },
});
