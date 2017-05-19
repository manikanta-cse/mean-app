var passport = require('passport');


module.exports.authenticate = function (req, resp, next) {
    req.body.username = req.body.username.toLowerCase();
    var auth = passport.authenticate('local', function (err, user) {
        if (err) { return next(err); }
        if (!user) { resp.send({ success: false }); }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            resp.send({ success: true, user: user });
        });
    });
    auth(req, resp, next);
};

module.exports.requireApiLogin = function (req, resp, next) {
    if (!req.isAuthenticated()) {
        resp.status(403);
        resp.end();
    }
    else {
        next();
    }
};


module.exports.requireRole = function (role) {
    return function (req, resp, next) {
        if (!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
            resp.status(403);
            resp.end();
        }
        else {
            next();
        }
    };
};