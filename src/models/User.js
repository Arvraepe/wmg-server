var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    salt: String,
    session: String
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

