const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    status: {
        type: String,
        enum: ['Open', 'InProgress', 'Closed'],
        default: 'Open'
    },
    resolution: {
        type: String,
        trim: true,
        maxlength: 1000 
    }
}, {
    timestamps: true 
});


module.exports = mongoose.model('Query', querySchema);