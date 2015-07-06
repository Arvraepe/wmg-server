var mongoose = require('mongoose');

var QuestSchema = mongoose.Schema({
    description: String,
    gold: Number,
    level: Number,
    duration: Number,
    experience: Number,
    difficulty: Number,
    state: String
});

var Quest = mongoose.model('Quest', QuestSchema);



