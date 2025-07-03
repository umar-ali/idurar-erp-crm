const Joi = require('joi');
const noteSchema = Joi.object().keys({
  author: Joi.string().required(),
  content: Joi.string().required(),
  createdAt: Joi.date()
})

const schema = Joi.object({
  customer: Joi.alternatives().try(Joi.string(), Joi.object()).required(),
  description: Joi.string().required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
  status: Joi.string().valid('Open', 'InProgress', 'Closed'),
  resolution: Joi.string().max(1000),
  notes: Joi.array().items(noteSchema).optional()
});

module.exports = {schema, noteSchema};
