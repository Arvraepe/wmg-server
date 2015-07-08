var mongoose = require('mongoose');
var CallbackHandler = require('../infrastructure/CallbackHandler.js');
var SHA1 = require('sha1');
var UUID = require('node-uuid');

require('../models/User.js');
User = mongoose.model('User');

function create (config) {

    var salt = UUID.v1();
    var user = new User({
        username: config.user.username,
        password: SHA1(salt+config.user.password),
        salt: salt,
        level: 1,
        experience: 0,
        strength: 10,
        intelligence: 8,
        lore: 6,
        agility: 6,
        speed: 6,
        endurance: 5,
        maxHP: 50,
        currentHP: 50,
        gold: 100
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

function check (session, callback) {
    User.findOne({ session: session },
        CallbackHandler.defaultCallback.bind({},{
            onSuccess: function (user) {
                if (user === null) { callback(null); } else { callback(user); }
            },
            onFail: function () { callback(null); }
        })
    );
}

function startQuest (config) {
    if (config.user.currentQuest) config.onFail('You are already on a quest, you should finish it before starting a new one');
    else User.update({ currentQuest: config.quest },
        CallbackHandler.defaultCallback.bind({},{
            onSuccess: config.onSuccess,
            onFail: function () { config.onFail('Starting the quest failed, please try again') }
        })
    );
}

exports.create = create;
exports.authenticate = authenticate;
exports.check = check;
exports.startQuest = startQuest;
