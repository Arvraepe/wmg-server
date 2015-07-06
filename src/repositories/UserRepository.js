var mongoose = require('mongoose');
var CallbackHandler = require('../infrastructure/CallbackHandler.js');
var SHA1 = require('sha1');
var UUID = require('node-uuid');

User = mongoose.model('User');

function create (config) {

    var salt = UUID.v1();
    var user = new User({
        username: config.user.username,
        password: SHA1(salt+config.user.password),
        salt: salt
    });

    user.save (
        CallbackHandler.defaultCallback.bind({},{
            onSuccess: config.onSuccess,
            onFail: config.onFail
        })
    );
}

function authenticate (config) {

    User.findOne({ username: config.user.username },
        CallbackHandler.defaultCallback.bind({},{
            onSuccess: function (user) {
                if (user === null) {
                    config.onFail([{ level: 'error', message:  'Could not login with username and password combination' }]);
                } else {
                    if (SHA1(user.salt+config.user.password) === user.password) {
                        var session = UUID.v1();
                        User.update({ username: user.username }, { session: session}, function (err, result) {
                            if (err) { config.onFail([{ level: 'error', message:  'Could not login due to internal error, please retry later' }]); }
                            else {
                                config.onSuccess({ session: session });
                            }
                        });
                    } else if (config.onFail) {
                        config.onFail([{ level: 'error', message:  'Could not login with username and password combination' }]);
                    }
                }
            },
            onFail: config.onFail
        })
    );

}

exports.create = create;
exports.authenticate = authenticate;
