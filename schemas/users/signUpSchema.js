const Joi = require("joi");

const signUpSchema = {
  body: Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email()
      .required()
      .messages({ "string.email": "Please provide a valid email address" }),
    password: Joi.string().min(8).max(30).required(),
    repeatPassword: Joi.string().valid(Joi.ref("password")).required(),
    age: Joi.number().min(18).max(150).required(),
  }).with("password", "repeatPassword"),
};

module.exports = signUpSchema;
