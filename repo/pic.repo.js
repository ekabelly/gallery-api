const Pic = require('../models/pic.model');
const { buildPicQuery } = require('../util/query-builder');

module.exports.fetchPicsRepo = async ({queryParams, requestedProperties = null}) => {
    const query = buildPicQuery(queryParams, requestedProperties);
    const picRes = await Pic.find(query, ).lean();
    return picRes;
}

module.exports.fetchPicById = async (id, requestedProperties = null) => {
    const picRes = await Pic.findById({ _id: id }, requestedProperties).lean();
    return picRes;
}