var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function (config) {
    mongoose.connect(config.db); //mongo db hosted on mlab
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function cb() {
        console.log('db opended!');
    });


    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        userName: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]
    });

    userSchema.methods = {
        authenticate: function (passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    }

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function (err, collection) {
        if (collection.length == 0) {
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'mk');
            User.create({ firstName: 'Mani', lastName: 'K', userName: 'mk', salt: salt, hashed_pwd: hash, roles: ['admin'] });
            salt = createSalt();
            hash = hashPwd(salt, 'bm');
            User.create({ firstName: 'Bharat', lastName: 'M', userName: 'bm', salt: salt, hashed_pwd: hash, roles: [] });
        }
    });


};


function createSalt() {
    return crypto.randomBytes(128).toString('base64');
};

function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    hmac.setEncoding('hex');
    hmac.write(pwd);
    hmac.end();
    return hmac.read();
}