require('dotenv').config({ path:'./env/.env' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const conn = require('./repo/conn');
const { errHandler } = require('./middlewares/middlewares');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/v1/pics', require('./controllers/pic.api'));

app.use((err, req, res, next) => errHandler(err, req, res));

(async () => {
    await conn;
    await require('./util/create-initial-data')();
    app.listen(process.env.PORT, () => console.log(`app listening on port ${process.env.PORT}`))
})();
