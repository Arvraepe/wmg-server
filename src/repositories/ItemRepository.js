var mongoose = require('mongoose');
var CallbackHandler = require('../infrastructure/CallbackHandler.js');
var RandomHelper = require('../infrastructure/RandomHelper.js');
var DatabaseHelper = require('../infrastructure/DatabaseHelper.js');
var Items = require('../data/Items.js');

require('../models/Item.js');
Item = mongoose.model('Item');

function getRandomItem (config) {
    var level = config.user.level;
    var item = Items.equipment[RandomHelper.randomInt(0, Items.equipment.length)];

    var decorated = false;
    if (level > 1 && RandomHelper.hasPercentChanceBoolean(10)) decorated = true;
    if (level > 5 && RandomHelper.hasPercentChanceBoolean(20)) decorated = true;
    if (level > 10 && RandomHelper.hasPercentChanceBoolean(50)) decorated = true;
    if (level > 20 && RandomHelper.hasPercentChanceBoolean(70)) decorated = true;
    if (level > 30 && RandomHelper.hasPercentChanceBoolean(100)) decorated = true;

    if (decorated) {
        var adjective = Items.adjectives[RandomHelper.randomInt(0, Items.adjectives.length)];
        var name = item.name;
        item.name = adjective.name + ' ' + name;
        Object.keys(adjective.effects).forEach(function (effect) {
            // is a basic addition, like value or weight
            if (item[effect]) item[effect] += adjective.effects[effect];
            // is an existing effect addition, like damage or defense
            else if (item.effects[effect]) item.effects[effect] += adjective.effects[effect];
            // is a new effect addition, one that wasn't on the equipment already
            else item.effects[effect] = adjective.effects[effect];
        });
    }

    return new Item({
        name: item.name,
        belongsTo: config.user.username,
        equipped: false,
        consumable: false,
        type: item.type,
        weight: item.weight,
        value: item.value,
        effects: item.effects
    });
}

function createRandomLootForUserQuest (config) {
//    var quest =  config.quest;
    var level = config.user.level;
    var loot = [];
    if (level > 0 && RandomHelper.hasPercentChanceBoolean(80)) loot.push(getRandomItem(config));
    if (level > 10 && RandomHelper.hasPercentChanceBoolean(50)) loot.push(getRandomItem(config));
    if (level > 20 && RandomHelper.hasPercentChanceBoolean(20)) loot.push(getRandomItem(config));
    if (level > 40 && RandomHelper.hasPercentChanceBoolean(10)) loot.push(getRandomItem(config));
    if (level > 50 && RandomHelper.hasPercentChanceBoolean(50)) loot.push(getRandomItem(config));

    return loot;
}

function doLootRuns (runs, config) {
    var all = []
    for (; runs > 0; runs--)
        all = all.concat(createRandomLootForUserQuest(config));
    return all;
}


exports.doLootRuns = doLootRuns;