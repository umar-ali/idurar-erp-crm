const Joi = require('joi');
const schema = Joi.object({
  customer: Joi.alternatives().try(Joi.string(), Joi.object()).required(),
  description: Joi.string().required(),
  createdAt: Joi.date(),
  status: Joi.string().valid('Open', 'InProgress', 'Closed'),
  resolution: Joi.string().max(1000)
});

module.exports = schema;
