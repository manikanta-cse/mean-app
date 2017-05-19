var User = require('mongoose').model('User'),
    encrypt = require('../utilites/encryption');

module.exports.getUsers = function (req, resp) {
    User.find({}).exec(function (err, collection) {
        resp.send(collection);
    });
}

module.exports.createUser = function (req, resp, next) {
    var userData = req.body;
    userData.username = userData.username.toLowerCase();
    userData.salt = encrypt.createSalt();
    userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);

    User.create(userData, function (err, user) {
        if (err) {
            if (err.toString().indexOf('E1100') > -1) {
                err = new Error('Duplicate Username');
            }
            resp.status(400);
            return resp.send({ reason: err.toString() });
        }

        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            resp.send(user);
        });

    });

};

module.exports.updateUser = function (req, resp) {
    var userUpdates = req.body;

    if (req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
        resp.status(403);
        return resp.end();
    }

    req.user.username = userUpdates.username;
    req.user.firstName = userUpdates.firstName;
    req.user.lastName = userUpdates.lastName;
    if (userUpdates.password && userUpdates.password.length > 0) {
        req.user.salt = encrypt.createSalt();
        req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdates.password);
    }

    req.user.save(function (err) {
        if (err) {
            resp.status(400);
            return resp.send({ reason: err.toString() });
        }
        resp.send(req.user);
    });

};

