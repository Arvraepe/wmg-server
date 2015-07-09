var mongoose = require('mongoose');

var QuestSchema = mongoose.Schema({
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
});

exports.Model = mongoose.model('Quest', QuestSchema);

exports.AVAILABLE = "AVAILABLE";
exports.PENDING = 'PENDING';
exports.FINISHED = 'FINISHED';
exports.NOTIFIED = 'NOTIFIED';



