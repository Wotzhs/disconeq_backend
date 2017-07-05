const express    = require('express');
const bodyParser = require('body-parser');
const routes     = require('./routes/routes');
const app        = express();

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/disconeq');

app.use(( req, res, next ) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
	res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
	next();
} )
app.use(bodyParser.json());

routes(app);

module.exports = app