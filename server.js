
/**
 * Database initialization
 */
var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/wmg');

// Initialize the models
require('./src/models/User');
require('./src/models/Item');
require('./src/models/Quest');

/**
 * Rest API initialization
 */
var restify = require('restify');
var S = restify.createServer();
    S.use(restify.bodyParser());

// Initialize the routes
require('./src/routes/AuthenticationRoutes.js').init(S);

/**
 * Starting the server
 */
S.listen(8080, function () {
    console.log('%s listening at %s', S.name, S.url);
});