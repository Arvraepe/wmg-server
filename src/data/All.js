var _ = require('underscore');

var Environments = require('./Environments.js');
var Items = require('./Items.js');
var People = require('./People.js');
var Monsters = require('./Monsters.js');

exports.map = _.extend(Environments, Items, People, Monsters);
