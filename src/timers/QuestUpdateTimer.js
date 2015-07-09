var mongoose = require('mongoose');

var QuestRepository = require('../repositories/QuestRepository.js');
var UserRepository = require('../repositories/UserRepository.js');

function updateAllPendingQuests (quests, callback) {
    var updated = [];
    function update (quest) {
        QuestRepository.update({
            conditions: { _id: quest._id },
            changes: { duration: quest.duration -5 },
            onSuccess: function () {
                updated.push(quest);
                if (quests.length === 0) callback(updated);
                else update(quests.pop());
            },
            onFail: function () { console.log('error:', arguments); }
        });

    }
    if (quests.length > 0) update(quests.pop());
    else callback([]);
}

function updateAllExpiredQuests (quests, callback) {

    var finished = [];
    function update (quest) {

        QuestRepository.update({
            conditions: { _id: quest._id },
            changes: { state: 'FINISHED' },
            onSuccess: function () {
                finished.push(quest);
                if (quests.length === 0) callback(finished);
                else update(quests.pop());
            }
        })

    }
    if (quests.length > 0) update(quests.pop());
    else callback([]);
}

function updateQuests () {
    QuestRepository.getQuests({
        conditions: { state: 'PENDING' },
        onSuccess: function (quests) {
            var pendingQuestAmount = quests.length;
            updateAllPendingQuests(quests, function (updated) {
                updateAllExpiredQuests(updated.filter(function (quest){ return quest.duration <= 0; }), function (finished) {
//                    console.log('Quest Task Runner: Updated '+pendingQuestAmount+' quests '+finished.length+' got finished');
                });
            });
        }
    });
}

exports.start = function () {
    setInterval(updateQuests, 5000);
};
