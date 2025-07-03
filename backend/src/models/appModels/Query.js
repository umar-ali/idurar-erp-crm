const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
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

const querySchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Open', 'InProgress', 'Closed'],
        default: 'Open'
    },
    resolution: {
        type: String,
        trim: true,
        maxlength: 1000
    },
    notes: [noteSchema]
}, {
    timestamps: true
});


module.exports = mongoose.model('Query', querySchema);