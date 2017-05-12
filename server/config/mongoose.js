var mongoose = require('mongoose');

module.exports = function (config) {
    mongoose.connect(config.db); //mongo db hosted on mlab
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function cb() {
        console.log('db opended!');
    });


    var userSchema=mongoose.Schema({
        firstName:String,
        lastName:String,
        userName:String
    });

    var User=mongoose.model('User',userSchema);

    User.find({}).exec(function(err,collection){
        if(collection.length==0){
            User.create({firstName:'Mani',lastName:'K',userName:'mk'});
        }
    });


};