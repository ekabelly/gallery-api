const buildPicQuery = queryParams => {
    const query = {};
    const queryParamsFields = Object.keys(queryParams);
    if (queryParamsFields.length > 0) {
        query.$or = [];
        for (const paramName of queryParamsFields) {
            query.$or.push({ [paramName]: { $regex: `.*${queryParams[paramName]}.*`, $options: 'i' } });
        }
    }
    return query;
}

module.exports = {
    buildPicQuery
}