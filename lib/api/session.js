var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../model/user');

module.check = function (username, password, done) {
    console.log(username, password);
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

module.create = function () {
    return passport.authenticate('local', {
        successRedirect: exports.read,
        failureRedirect: exports.read
    });
}();

module.read = function (req, res) {
    res.json({message: 'auth success !'});
};

exports.register = function (prefix, app) {
    passport.use(new LocalStrategy(module.check));
    app.post(prefix, module.create);
    app.get(prefix, module.read);
};