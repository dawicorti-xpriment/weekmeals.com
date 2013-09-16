var auth = require('./auth');

exports.register = function (prefix, app) {
    auth.register(prefix + '/auth', app);
};