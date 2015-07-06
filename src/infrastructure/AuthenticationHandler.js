var _ = require('underscore');
var UserRepository = require('../repositories/UserRepository.js');
var NoAuthPaths = ['/authenticate', '/register'];

exports.authenticationParser = function (req, res, next) {
    if (_.indexOf(NoAuthPaths, req.path()) === -1) {
        UserRepository.check (req.params.session, function (user) {
            if (user) {
                req.user = user;
                next();
            } else {
                res.send({ success: false, messages: [{ level: 'error', message: 'Could not find your current session, please login' }] });
            }
        });

    } else next();
};
