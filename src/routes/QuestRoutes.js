var QuestRepository = require('../repositories/QuestRepository.js');
var ResponseHandler = require('../infrastructure/ResponseHandler.js');

exports.init = function (S) {
    console.log('Initialized quest routes');

    S.get('/quest/list', function (req, res){
        QuestRepository.getQuests({
            conditions: { user: req.user.username },
            onSuccess: function (quests) { ResponseHandler.sendSuccessResponse(res, quests); },
            onFail: function (error) { ResponseHandler.sendFailResponse(res, [{ level: 'error', message: error }]); }
        });
    });

    S.get('/quest/last', function (req, res){
        res.send({ message: 'to be implemented' });
    });

    S.post('/quest/start', function (req, res){
        QuestRepository.startQuest({
            inputId: req.body.inputId,
            user: req.user,
            onSuccess: function (result) { ResponseHandler.sendSuccessResponse(res, result); },
            onFail: function (error) { ResponseHandler.sendFailResponse(res, [{ level: 'error', message: error }]); }
        });
    });

    S.post('/quest/cancel', function (req, res){
        res.send({ sent: req.body, message: 'to be implemented' });
    });
};

