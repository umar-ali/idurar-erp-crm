const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    query: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Query',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Note', noteSchema);