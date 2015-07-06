var mongoose = require('mongoose');
var CallbackHandler = require('../infrastructure/CallbackHandler.js');
var Items = require('../data/Items.js');

require('../models/Item.js');
Item = mongoose.model('Item');

function createRandomLoot (config) {
    var item = new Item ({
        consumable: false,
    });
}
