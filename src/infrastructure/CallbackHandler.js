function defaultCallback (config, err, result) {
    if (err) {
        if (config.onFail) config.onFail(err);
        else console.error(err);
    } else {
        if (config.onSuccess) config.onSuccess(result);
    }
}

exports.defaultCallback = defaultCallback;