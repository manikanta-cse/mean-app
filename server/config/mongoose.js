var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    courseModel = require('../models/Course');;

module.exports = function (config) {
    mongoose.connect(config.db); //mongo db hosted on mlab
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function cb() {
        console.log('db opended!');
    });

    userModel.createDefaultUser();
    courseModel.createDefaultCourses();


};
