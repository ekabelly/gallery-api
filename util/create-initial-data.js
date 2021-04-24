const mockData = require('../repo/mock-data.json');
const Pic = require('../models/pic.model');

module.exports = async () => {
    const pics = await require('../repo/pic.repo').fetchPicsRepo({queryParams: {}});
    if(!pics || pics.length < 1) {
        await Pic.insertMany(mockData);
        console.log('Created Initial Data');
    }
}