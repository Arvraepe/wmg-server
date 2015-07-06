var UserRepository = require('../repositories/UserRepository.js');
var ResponseHandler = require('../infrastructure/ResponseHandler.js');

exports.init = function (S) {

    console.log('Initialized authenticate route');

    S.post('/register', function (req, res, next){
        UserRepository.create({
            user: {
                username: req.body.username,
                password: req.body.password
            },
            onSuccess: function (result) { ResponseHandler.sendSuccessResponse(res, result);  },
            onFail: function (result) { ResponseHandler.sendFailResponse(res, result); }
        });
    });

    S.post('/authenticate', function (req, res, next) {
        UserRepository.authenticate({
            user: {
                username: req.body.username,
                password: req.body.password
            },
            onSuccess: function (result) { ResponseHandler.sendSuccessResponse(res, result); },
            onFail: function (result) { ResponseHandler.sendFailResponse(res, result); }
        });
    });

};
