const mongoose = require("mongoose")
const QueryModel = mongoose.model('Query')
const AdminModel = mongoose.model("Admin")

const { noteSchema } = require('./schemaValidate');

const create = async (req, res) => {
    const { error, value } = noteSchema.validate(req.body);
    if (error) {
        const { details } = error;
        return res.status(400).json({
            success: false,
            result: null,
            message: details[0]?.message,
        });
    }

    const queryId = req.params.id
    let { author } = req.body;

    const query = await QueryModel.findOne({ "_id": queryId })
    const is_valid_author = await AdminModel.exists({ "_id": author })

    if (!query || !is_valid_author) {
        const errMsg = !query && !is_valid_author ? 'query and author' : query ? 'query' : is_valid_author ? 'author' : '';
        return res.status(400).json({
            success: false,
            result: null,
            message: `Invalid ${errMsg}`,
        });
    }

    query.notes.push(req.body)
    const result = await query.save();
    return res.status(200).json({
        success: true,
        result: result,
        message: "Note Posted Successfully"
    });
};

const remove = async (req, res) => {

    const { id, noteId } = req.params

    const query = await QueryModel.findOne({ "$and": [{"_id": id}, { "notes": { "$ne": [] } }] })

    if (!query) {
        return res.status(404).json({
            success: false,
            result: null,
            message: "record not found"
        })
    }
    query.notes = query.notes.filter(note => note._id.toString() !== noteId);
    await query.save();

    return res.status(204).json({
        success: true,
        result: null,
        message: "Deleted Document"
    })
};

module.exports = { create, remove }



