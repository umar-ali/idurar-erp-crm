const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
const methods = createCRUDController('Query');


const create = require("./create");

methods.create = create;

module.exports = methods

