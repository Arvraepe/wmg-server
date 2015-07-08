//var QuestRepository = require('../repositories/QuestRepository.js');

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
};
