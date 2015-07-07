
function randomInt (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function hasPercentChanceBoolean (percent, round) {
    var roundFunction = typeof round === 'function' ? round : Math.floor;
    return randomInt(0, roundFunction(100 / percent)) === 0;
}

exports.randomInt = randomInt;
exports.hasPercentChanceBoolean = hasPercentChanceBoolean;