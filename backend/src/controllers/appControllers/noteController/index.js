const mongoose = require("mongoose")
const Model = mongoose.model('Note');

const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
const methods = createCRUDController('Note');

const create = async (req, res) => {
  let body = req.body;
  const { error, value } = schema.validate(body);
  if (error) {
    const { details } = error;
    return res.status(400).json({
      success: false,
      result: null,
      message: details[0]?.message,
    });
  }
  const result = await new Model(body).save();
  return res.status(200).json({
    success: true,
    result: result,
    message: "Note Posted Successfully"
  });
};

methods.create = create;

module.exports = methods;