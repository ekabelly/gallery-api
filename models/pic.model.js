const mongoose = require('mongoose');
const mongooseLeanId = require('mongoose-lean-id');

const PicSchema = mongoose.Schema({
    picName: String,
    picFileName: String,
    picAddress: String,
    artist: String,
    description: String
});

PicSchema.plugin(mongooseLeanId);

module.exports = mongoose.model('pictures', PicSchema);