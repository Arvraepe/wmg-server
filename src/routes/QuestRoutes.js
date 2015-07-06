exports.init = function (S) {
    console.log('Initialized quest routes');

    S.get('/quest/list', function (req, res){
        res.send({ message: 'to be implemented' });
    });

    S.get('/quest/last', function (req, res){
        res.send({ message: 'to be implemented' });
    });

    S.post('/quest/start', function (req, res){
        res.send({ sent: req.body, message: 'to be implemented' });
    });

    S.post('/quest/cancel', function (req, res){
        res.send({ sent: req.body, message: 'to be implemented' });
    });
};

