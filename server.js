var _ = require('underscore');
/**
 * Database initialization
 */
var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/wmg');

// Initialize the models
require('./src/models/Quest');
require('./src/models/Item');
require('./src/models/User');

/**
 * Rest API initialization
 */
var restify = require('restify');
var S = restify.createServer();
    S.use(restify.queryParser());
    S.use (restify.bodyParser());
    S.use (require('./src/infrastructure/AuthenticationHandler.js').authenticationParser);

// Initialize the routes
require('./src/routes/AuthenticationRoutes.js').init(S);
require('./src/routes/InformationRoutes.js').init(S);
require('./src/routes/QuestRoutes.js').init(S);

/**
 * Starting the server
 */
S.listen(8080, function () {
    console.log('%s listening at %s', S.name, S.url);
});