var mongoose = require('mongoose');

var CallbackHandler = require('../infrastructure/CallbackHandler.js');
var RandomHelper = require('../infrastructure/RandomHelper.js');

var People = require('../data/People.js');
var Items = require('../data/Items.js');
var Environments = require('../data/Environments.js');
var Quests = require('../data/Quests.js');

require('../models/Quest.js');
Quest = mongoose.model('Quest');

function createRandomQuests (lvl, amount) {
    var quests = [];
    for (var i = amount; i > 0; i--) {
        var level = RandomHelper.randomInt(
            lvl - 2 <= 1 ? 1 : lvl - 2, lvl + 2
        );

        var QuestMetaData = Quests.meta[RandomHelper.randomInt(0, Quests.meta.length)];

        var description = QuestMetaData.quest;

        description = description.replace('$pCommon', People.pCommon[RandomHelper.randomInt(0, People.pCommon.length)].name);
        description = description.replace('$pImportant', People.pImportant[RandomHelper.randomInt(0, People.pImportant.length)].name);
        description = description.replace('$pRoyalty', People.pRoyalty[RandomHelper.randomInt(0, People.pRoyalty.length)].name);
        description = description.replace('$pFamily', People.pFamily[RandomHelper.randomInt(0, People.pFamily.length)].name);
        description = description.replace('$pMonster', People.pMonster[RandomHelper.randomInt(0, People.pMonster.length)].name);

        description = description.replace('$iCommon', Items.iCommon[RandomHelper.randomInt(0, Items.iCommon.length)].name);
        description = description.replace('$iExquisite', Items.iExquisite[RandomHelper.randomInt(0, Items.iExquisite.length)].name);
        description = description.replace('$iUnique', Items.iUnique[RandomHelper.randomInt(0, Items.iUnique.length)].name);

        description = description.replace('$eCity', Environments.eCity[RandomHelper.randomInt(0, Environments.eCity.length)].name);
        description = description.replace('$eDungeon', Environments.eDungeon[RandomHelper.randomInt(0, Environments.eDungeon.length)].name);

        var duration = QuestMetaData.difficulty * level + RandomHelper.randomInt(900, 1200);
        var quest = new Quest({
            description: description,
            gold: QuestMetaData.difficulty * RandomHelper.randomInt(1, 10) + level * RandomHelper.randomInt(5, 10),
            duration: duration,
            experience: level * RandomHelper.randomInt(10, 30),
            level: level,
            difficulty: QuestMetaData.difficulty
        });

        quests.push(quest);
    }
    return quests;
}

exports.createRandomQuests = createRandomQuests;
