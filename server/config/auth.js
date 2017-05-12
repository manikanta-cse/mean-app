var passport = require('passport');


module.exports.authenticate = function (req, resp, next) {
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