const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
const methods = createCRUDController('Query');


const create = require("./create");
const update = require("./update");
const {readOne, paginatedList} = require("./read")
const {create: addNote, remove: removeNote} = require("./queryNotes")

methods.create = create;
methods.read = readOne;
methods.list = paginatedList;
methods.update = update;
methods.addNote = addNote;
methods.removeNote = removeNote;

module.exports = methods;

