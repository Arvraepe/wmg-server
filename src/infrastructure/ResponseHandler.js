var _ = require('underscore');

function sendResponse (res, config) {
    res.send({
        success: config.success,
        messages: config.messages,
        data: config.data
    });
}

function sendSuccessResponse (res, data) {
    sendResponse(res, {
        success: true,
        data: data
    });
}

function sendFailResponse (res, messages) {
    sendResponse(res, {
        success: false,
        messages: messages.name === 'Error' ? [{ level: 'error', message: messages.message }] : messages
    });
}

exports.sendSuccessResponse = sendSuccessResponse;
exports.sendFailResponse = sendFailResponse;

