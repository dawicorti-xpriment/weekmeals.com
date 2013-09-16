var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../model/user');

module.check = function (username, password, done) {
    User.findOne({username: username}, function(err, user) {
        if (err) { return done(err); }
        
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    });
};

module.factory = function () {
    return passport.authenticate('local', {
        successRedirect: module.prefix,
        failureRedirect: module.prefix + '/error'
    });
};

module.success = function (req, res) {
    res.json({message: 'auth success !'});
};

module.error = function (req, res) {
    res.json({message: 'auth error'});
};

exports.register = function (prefix, app) {
    module.prefix = prefix;

    passport.use(new LocalStrategy(module.check));
    app.get(prefix + '/error', module.error);
    app.get(prefix, module.success);
    app.post(prefix, module.factory);
};