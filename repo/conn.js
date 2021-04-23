const mongoose = require('mongoose');

// Overriding defaults deprecated by mongodb driver
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true );

module.exports =  mongoose.connect(process.env.DB_URL);