const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
const methods = createCRUDController('Query');


const create = require("./create");
const {readOne, paginatedList} = require("./read")

methods.create = create;
methods.read = readOne;
methods.list = paginatedList;

module.exports = methods;

