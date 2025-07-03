const mongoose = require("mongoose")
const Model = mongoose.model('Note');
const QueryModel = mongoose.model('Query')
const AdminModel = mongoose.model("Admin")

const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
const methods = createCRUDController('Note');
const schema = require('./schemaValidate');

const create = async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    const { details } = error;
    return res.status(400).json({
      success: false,
      result: null,
      message: details[0]?.message,
    });
  }
  let { query, author } = req.body;

  let is_valid_query = QueryModel.exists({ "_id": query })
  let is_valid_author = AdminModel.exists({ "_id": author })

  if (!is_valid_query || !is_valid_admin) {
    const errMsg = !is_valid_query && !is_valid_author ? 'query and author' : is_valid_query ? 'query' : is_valid_author ? 'author' : '';
    return res.status(400).json({
      success: false,
      result: null,
      message: `Invalid ${errMsg}`,
    });
  }
  const result = await new Model(body).save();
  return res.status(200).json({
    success: true,
    result: result,
    message: "Note Posted Successfully"
  });
};

const remove = async (req, res) => {

  const { id, noteId } = req.params

  const isExist = await Model.exists({ "_id": noteId })

  if (!previousPayment) {
    return res.status(404).json({
      success: false,
      result: null,
      message: 'No document found ',
    });
  }

  const result = await Model.findByIdAndDelete({ "_id": noteId })
  if (!result) {
    return res.status(404).json({
      success: false,
      result: null,
      message: 'No document found ',
    });
  }

  return res.status(204).json({
    success: true,
    result: null,
    message: "Deleted Document"
  })
};



methods.create = create;
methods.delete = remove;

module.exports = methods;