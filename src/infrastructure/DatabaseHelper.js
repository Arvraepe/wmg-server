exports.saveAll = function (config) {
    var error = [];
    var all = config.arr;

    var saved = [];
    function save (obj) {
        obj.save(function (err, sobj) {
            if (err) error.push(err);
            else {
                saved.push(sobj);
                if (all.length > 0) save(all.pop());
                else if (all.length === 0) {
                    if (error.length > 0) config.onFail(error);
                    else config.onSuccess (saved);
                }
            }
        });
    }

    save(all.pop());
};
