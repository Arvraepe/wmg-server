var mongoose = require('mongoose');

var QuestSchema = mongoose.Schema({
    user: String,
    description: String,
    gold: Number,
    level: Number,
    duration: Number,
    experience: Number,
    difficulty: Number,
    state: String,
    loot: Number
});

var Quest = mongoose.model('Quest', QuestSchema);

exports.AVAILABLE = "AVAILABLE";
exports.PENDING = 'PENDING';
exports.FINISHED = 'FINISHED';
exports.NOTIFIED = 'NOTIFIED';



