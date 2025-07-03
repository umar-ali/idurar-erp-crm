const mongoose = require("mongoose")

const Model = mongoose.model('Query');
const clientModel = mongoose.model('Client');

const schema = require('./schemaValidate');

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
  let { customer } = body;
  let is_valid_client = clientModel.exists({ "_id": customer })
  if (!is_valid_client) {
    return res.status(400).json({
      success: false,
      result: null,
      message: "Invalid Customer",
    });
  }
  const result = await new Model(body).save();
  return res.status(200).json({
    success: true,
    result: result,
    message: "Query Posted Successfully"
  });
};

module.exports = create