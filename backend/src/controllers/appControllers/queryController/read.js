const Query = require("@/models/appModels/Query");
const mongoose = require("mongoose")


const readOne = async (req, res) => {
    let id = req.params.id;

    const result =await Query.findOne({
        _id: id
    })
        .populate("customer", "name")
        .exec();
    if (!result) {
        return res.status(404).json({
            success: false,
            result: null,
            message: "No Queries Found",
        });
    } else {
        return res.status(200).json({
            success: true,
            result,
            message: "Queries Found"
        })
    }
}

const paginatedList = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.page || 10;

    const startIdx = (page - 1) * limit;
    const total = await Query.countDocuments();

    const result = Model.find({}, {notes:-1})
        .skip(startIdx)
        .limit(limit)
        .populate("customer", "name")
        .exec();

    const pages = Math.ceil(total / limit)

    const pagination = { page, pages, total }

    if (!result) {
        return res.status(203).json({
            success: false,
            result: [],
            message: "Query is Empty",
        });
    } else {
        return res.status(200).json({
            success: true,
            result,
            pagination,
            message: "Queries Found"
        })
    }
}

module.exports = {
    readOne,
    paginatedList,
}


