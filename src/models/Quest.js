var mongoose = require('mongoose');

var QuestSchema = mongoose.Schema({
    description: String,
    gold: Number,
    level: Number,
    duration: Number
});

var Quest = mongoose.model('Quest', QuestSchema);



