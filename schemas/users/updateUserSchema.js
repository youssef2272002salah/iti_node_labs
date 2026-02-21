const Joi = require("joi");

module.exports = {
  body: Joi.object({
    name: Joi.string().alphanum().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
    age: Joi.number().min(18).max(150).optional(),
  }),
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};
