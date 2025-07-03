const mongoose = require('mongoose');

const Model = mongoose.model('Query');

const update = async (req, res) => {
    const allowedFields = ['status', 'description', 'resolution'];
    const updates = {};
    for (const key of allowedFields) {
        if (req.body[key] !== undefined) {
            updates[key] = req.body[key];
        }
    }
    
    updates["updatedAt"] = Date.now()

    const result = await Model.findOneAndUpdate({ _id: req.params.id }, { "$set": updates })

    if (!result) {
        return res.status(404).json({
            success: false,
            result: null,
            message: "Query Not Foound"
        })
    }

    return res.status(200).json({
        success: true,
        result,
        message: "Query Updated"
    })
}

module.exports = update