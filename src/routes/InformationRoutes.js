var QuestRepository = require('../repositories/QuestRepository.js');
var UserRepository = require('../repositories/QuestRepository.js');

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
        if (req.user.currentQuest.state === 'PENDING')
            res.send({
                success: true,
                data: 'You are on a quest! Completed '+(Math.floor(req.user.currentQuest.maxDuration / req.user.currentQuest.duration * 100)-100)+'%'
            });
        res.send({ success: true, data: 'You are idly wandering around...' });
    });
};
