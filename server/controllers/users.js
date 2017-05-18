var User = require('mongoose').model('User'),
    encrypt = require('../utilites/encryption');

module.exports.getUsers = function (req, resp) {
    User.find({}).exec(function (err, collection) {
        resp.send(collection);
    });
}

module.exports.createUser = function (req, resp, next) {
    var userData = req.body;
    userData.username=userData.username.toLowerCase();
    userData.salt =encrypt.createSalt();
    userData.hashed_pwd =encrypt.hashPwd(userData.salt,userData.password);

    User.create(userData,function(err,user){
        if(err){
            if(err.toString().indexOf('E1100')>-1){
                err = new Error('Duplicate Username');
            }
            resp.status(400);
            return resp.send({reason:err.toString()});
        }

        req.logIn(user,function(err){
            if(err) {
                return next(err);
            }
            resp.send(user);
        });
        
    });

};
