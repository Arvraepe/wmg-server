var mongoose = require('mongoose');

var ItemSchema = mongoose.Schema({
    name: String,
    belongsTo: String,
    slot: String,
    equipped: Boolean,
    consumable: Boolean,
    type: String,
    weight: Number,
    value: Number,
    effects: {
        damage: Number,
        defense: Number,
        strength: Number,
        life: Number
    }
});

var Item = mongoose.model('Item', ItemSchema);


