const Joi = require('joi');

const validate = require('./index');

const createSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
}).and('email');

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
}).and('password', 'email');

const updateSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
}).nand('email');

module.exports.validateCreate = (req, res, next) =>
  validate(createSchema, { ...req.body }, next);

module.exports.validateLogin = async (req, res, next) => {
  validate(loginSchema, req.body, next);
};

module.exports.validateUpdate = async (req, res, next) => {
  validate(updateSchema, req.body, next);
};
