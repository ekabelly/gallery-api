const picRepo = require('../repo/pic.repo');

module.exports.fetchPics = async queryParams => {
    const picRes = await picRepo.fetchPicsRepo(queryParams);
    return picRes;
}

module.exports.fetchPicById = async id => {
    const picRes = await picRepo.fetchPicById(id);
    return picRes;
}