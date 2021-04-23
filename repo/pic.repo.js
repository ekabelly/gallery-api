const Pic = require('../models/pic.model');

module.exports.fetchPicsRepo = async () => {
    const picRes = await Pic.find({}).lean();
    return picRes;
}

module.exports.fetchPicById = async id => {
    const picRes = await Pic.findById({ _id: id }).lean();
    return picRes;
}