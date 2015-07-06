var mongoose = require('mongoose');

var CallbackHandler = require('../infrastructure/CallbackHandler.js');
var RandomHelper = require('../infrastructure/RandomHelper.js');

var People = require('../data/People.js');
var Items = require('../data/Items.js');
var Environments = require('../data/Environments.js');
var Quests = require('../data/Quests.js');

//Item = mongoose.model('Item');

function createRandomQuests (lvl, amount) {
    var quests = [];
    for (var i = amount; i > 0; i--) {
        var QuestLevel = RandomHelper.randomInt(
            lvl - 5 <= 1 ? 1 : lvl - 5, lvl + 5
        );

        var QuestMetaData = Quests.meta[RandomHelper.randomInt(0, Quests.meta.length)];

        var QuestDescription = QuestMetaData.quest;

        QuestDescription = QuestDescription.replace('$pCommon', People.pCommon[RandomHelper.randomInt(0, People.pCommon.length)].name);
        QuestDescription = QuestDescription.replace('$pImportant', People.pImportant[RandomHelper.randomInt(0, People.pImportant.length)].name);
        QuestDescription = QuestDescription.replace('$pRoyalty', People.pRoyalty[RandomHelper.randomInt(0, People.pRoyalty.length)].name);
        QuestDescription = QuestDescription.replace('$pFamily', People.pFamily[RandomHelper.randomInt(0, People.pFamily.length)].name);
        QuestDescription = QuestDescription.replace('$pMonster', People.pMonster[RandomHelper.randomInt(0, People.pMonster.length)].name);

        QuestDescription = QuestDescription.replace('$iCommon', Items.iCommon[RandomHelper.randomInt(0, Items.iCommon.length)].name);
        QuestDescription = QuestDescription.replace('$iExquisite', Items.iExquisite[RandomHelper.randomInt(0, Items.iExquisite.length)].name);
        QuestDescription = QuestDescription.replace('$iUnique', Items.iUnique[RandomHelper.randomInt(0, Items.iUnique.length)].name);

        QuestDescription = QuestDescription.replace('$eCity', Environments.eCity[RandomHelper.randomInt(0, Environments.eCity.length)].name);
        QuestDescription = QuestDescription.replace('$eDungeon', Environments.eDungeon[RandomHelper.randomInt(0, Environments.eDungeon.length)].name);

        quests.push(QuestDescription);
    }
    return quests;
}

exports.createRandomQuests = createRandomQuests;
