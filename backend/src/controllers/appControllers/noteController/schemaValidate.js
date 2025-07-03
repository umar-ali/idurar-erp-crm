const Joi = require('joi');
const schema = Joi.object({
  query: Joi.string().required(),
  author: Joi.string().required(),
  content: Joi.string().required(),
  createdAt: Joi.date(),
});

module.exports = schema;

