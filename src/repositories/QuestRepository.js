var mongoose = require('mongoose');
var _ = require('underscore');

var CallbackHandler = require('../infrastructure/CallbackHandler.js');
var RandomHelper = require('../infrastructure/RandomHelper.js');

var All = require('../data/All.js');
//var People = require('../data/People.js');
//var Items = require('../data/Items.js');
//var Environments = require('../data/Environments.js');
var Quests = require('../data/Quests.js');

var QuestModel = require('../models/Quest.js');
Quest = mongoose.model('Quest');

var RandomPicker = function (level, need) {
    var typeGetter = {
        QuestGiver: function () {
            var type = 'pCommon';
            if (level > 1 && RandomHelper.hasPercentChanceBoolean(5)) type = 'pImportant';
            if (level > 10 && RandomHelper.hasPercentChanceBoolean(25)) type = 'pImportant';
            if (level > 10 && RandomHelper.hasPercentChanceBoolean(50)) type = 'pImportant';
            if (level > 30 && RandomHelper.hasPercentChanceBoolean(80)) type = 'pImportant';
            if (level > 30 && RandomHelper.hasPercentChanceBoolean(25)) type = 'pRoyalty';
            if (level > 50 && RandomHelper.hasPercentChanceBoolean(70)) type = 'pRoyalty';
            return type;
        },
        Items: function () {
            var type = 'iCommon';
            if (level > 1 && RandomHelper.hasPercentChanceBoolean(5)) type = 'iExquisite';
            if (level > 10 && RandomHelper.hasPercentChanceBoolean(15)) type = 'iExquisite';
            if (level > 30 && RandomHelper.hasPercentChanceBoolean(50)) type = 'iExquisite';
            if (level > 50 && RandomHelper.hasPercentChanceBoolean(70)) type = 'iExquisite';
            if (level > 60 && RandomHelper.hasPercentChanceBoolean(95)) type = 'iExquisite';
            return type;
        },
        UniqueItem: function () { return 'iUnique'; },
        Monsters: function () { return 'mMonsters'; },
        UniqueMonster: function () { return 'mUniqueMonster'; },
        City: function () { return 'eCity'; },
        Dungeon: function () { return 'eDungeon' },
        Person: function () {
            var type = 'pCommon';
            if (level > 1 && RandomHelper.hasPercentChanceBoolean(5)) type = 'pImportant';
            if (level > 10 && RandomHelper.hasPercentChanceBoolean(25)) type = 'pImportant';
            if (level > 10 && RandomHelper.hasPercentChanceBoolean(50)) type = 'pImportant';
            if (level > 30 && RandomHelper.hasPercentChanceBoolean(80)) type = 'pImportant';
            if (level > 30 && RandomHelper.hasPercentChanceBoolean(25)) type = 'pRoyalty';
            if (level > 50 && RandomHelper.hasPercentChanceBoolean(70)) type = 'pRoyalty';
            return type;
        }
    };

    var type = typeGetter[need]();
    return All.map[type][RandomHelper.randomInt(0, All.map[type].length)];
};

function createRandomQuests (lvl, amount) {
    var quests = [];
    for (var i = amount; i > 0; i--) {
        var maxDiff = 2;
        var level = RandomHelper.randomInt (
            lvl - maxDiff <= 1 ? 1 : lvl - maxDiff, lvl + maxDiff
        );

        var difficultyModifier = level - lvl;
        var difficulty = RandomHelper.randomInt(difficultyModifier + maxDiff, difficultyModifier + maxDiff + 1);

        var AvailableQuestsForLevel =  Quests.meta.filter(function(q){ return q.minLevel <= lvl });
        var QuestMetaData = AvailableQuestsForLevel[RandomHelper.randomInt(0, AvailableQuestsForLevel.length)];

        var FilledNeeds = QuestMetaData.needs.reduce(function (obj, need) { obj[need] = RandomPicker(lvl, need); return obj; }, {});
        var description = _.keys(FilledNeeds).reduce(function (description, need) { return description.replace("$"+need, FilledNeeds[need].name); }, QuestMetaData.quest);

        var QuestData = {
            gold: RandomHelper.randomInt(level*10, level*20) + (difficulty * 10),
            level: level,
            // between 10 and 20 minutes base time
            duration: (RandomHelper.randomInt(600, 1200) + (difficulty * 100)),
            experience: RandomHelper.randomInt(level * 20, level * 50) + (difficulty * 12),
            difficulty: difficulty,
            state: QuestModel.AVAILABLE,
            loot: RandomHelper.randomInt(1, difficulty),
            description: description
        };

        // Add Filled Needs decorators
        _.keys(FilledNeeds).forEach(function (need) {
            _.keys(FilledNeeds[need]).forEach(function (attr) {
                if (typeof QuestData[attr] === 'number' && typeof FilledNeeds[need][attr] === 'number')
                    QuestData[attr] += FilledNeeds[need][attr];
            });
        });

        // Some quests don't allow loot
        if (!QuestMetaData.canLoot) QuestData.loot = 0;
        quests.push(new Quest(QuestData));
    }
    return quests;
}

exports.createRandomQuests = createRandomQuests;
