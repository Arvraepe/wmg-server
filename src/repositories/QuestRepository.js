var mongoose = require('mongoose');
var _ = require('underscore');

var CallbackHandler = require('../infrastructure/CallbackHandler.js');
var DatabaseHelper = require('../infrastructure/DatabaseHelper.js');
var RandomHelper = require('../infrastructure/RandomHelper.js');

var UserRepository = require('../repositories/UserRepository.js');

var All = require('../data/All.js');
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

function createRandomQuests (user, amount) {
    var lvl = user.level;

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
            inputId: i,
            user: user.username,
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

//QuestRepository.generateQuestsForUser({
//    user: req.user,
//    onSuccess: function (quests) { ResponseHandler.sendSuccessResponse(res, quests); },
//    onFail: function (error) { ResponseHandler.sendFailResponse(res, error); }
//});

function generateQuestsForUser (config) {
    var quests = createRandomQuests(config.user, 10);
    Quest.remove({ user: config.user.username }, function (err) {
        if (err && config.onFail) config.onFail([{ level: 'error', message: 'Could not delete old quests' }]);
        else
            DatabaseHelper.saveAll({
                arr: quests,
                onSuccess: config.onSuccess,
                onFail: config.onFail
            });
    });
}

function getQuests (config) {
    Quest.find(config.conditions, CallbackHandler.defaultCallback.bind({},{
        onSuccess: config.onSuccess,
        onFail: config.onFail
    }))
}

function startQuest (config) {
    Quest.findOne({ user: config.user.username, inputId: config.inputId }, CallbackHandler.defaultCallback.bind({},{
        onSuccess: function (quest) {
            if (quest) {
                UserRepository.startQuest({
                    user: config.user,
                    quest: quest,
                    onSuccess: config.onSuccess,
                    onFail: config.onFail
                });
            } else config.onFail([{ level: 'error', message: 'Could not find the quest you want to start' }]);
        },
        onFail: config.onFail
    }));
}

exports.generateQuestsForUser = generateQuestsForUser;
exports.getQuests = getQuests;
exports.startQuest = startQuest;
