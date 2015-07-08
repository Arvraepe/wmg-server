var Quest = require('./Quest.js').Model;
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    salt: String,
    session: String,
    // Character
    level: Number,
    experience: Number,
    strength: Number,
    intelligence: Number,
    lore: Number,
    agility: Number,
    speed: Number,
    endurance: Number,
    maxHP: Number,
    currentHP: Number,
    gold: Number,
    // Quest
    currentQuest: {
        inputId: String,
        user: String,
        description: String,
        gold: Number,
        level: Number,
        duration: Number,
        maxDuration: Number,
        experience: Number,
        difficulty: Number,
        state: String,
        loot: Number
    }

});

var User = mongoose.model('User', UserSchema);

// Cannot save if username already exists
UserSchema.pre('save', function (next) {
    var self = this;
    User.find({ username : self.username }, function (err, docs) {
        if (!docs.length){
            next();
        } else {
            next(new Error('Could not create user, username already exists'));
        }
    });
});

