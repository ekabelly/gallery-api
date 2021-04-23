const mongoose = require('mongoose');
const mongooseLeanId = require('mongoose-lean-id');

const PicSchema = mongoose.Schema({
    name: String,
    picAddress: String,
    artist: String,
    description: String
});

PicSchema.plugin(mongooseLeanId);

module.exports = mongoose.model('ads', PicSchema);