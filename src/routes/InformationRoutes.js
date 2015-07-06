exports.init = function (S) {
    console.log('Initialized information routes');

    S.get('/info/whoami', function (req, res){
        res.send({ you: req.user });
    });
};
