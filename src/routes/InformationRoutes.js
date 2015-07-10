var QuestRepository = require('../repositories/QuestRepository.js');
var UserRepository = require('../repositories/UserRepository.js');

var ResponseHandler = require('../infrastructure/ResponseHandler.js');

exports.init = function (S) {
    console.log('Initialized information routes');

    S.get('/info/whoami', function (req, res){
        res.send({ success: true, data: req.user });
//        QuestRepository.generateQuestsForUser({
//            user: req.user,
//            onSuccess: function (quests) { ResponseHandler.sendSuccessResponse(res, quests); },
//            onFail: function (error) { ResponseHandler.sendFailResponse(res, error); }
//        });
    });

    S.get('/info/status', function (req, res){
        // THE master function... will give actual information!
        if (req.user.currentQuest)
            QuestRepository.getOne({
                conditions: { _id: req.user.currentQuest },
                onSuccess: function (quest) {

                    if (quest.state === 'FINISHED') {
                        QuestRepository.update({
                            conditions: { _id: req.user.currentQuest },
                            changes: { state: 'NOTIFIED' },
                            onSuccess: function () {

                                // Add Loot


//                                UserRepository.update({
//                                    conditions: { username: req.user.username },
//                                    changes: { currentQuest: null },
//                                    onSuccess: function () {
//                                        res.send({
//                                            success: true,
//                                            data: {
//                                                completedQuest: quest
//                                            }
//                                        });
//                                    }
//                                });
                            }
                        });
                    } else {
                        var duration = quest.duration <= 0 ? 0 : quest.duration;
                        var percentage = 100 - Math.floor((duration * 100 / quest.maxDuration));
                        res.send({
                            success: true,
                            data: {
                                ongoingQuest: {
                                    quest: quest,
                                    percentage: percentage
                                }
                            }
                        });
                    }

                }
            });
        else {
            res.send({ success: true, data: 'You are idly wandering around...' });
        }
    });
};
