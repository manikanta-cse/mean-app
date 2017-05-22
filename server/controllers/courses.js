var Course= require('mongoose').model('Course');

exports.getCourses=function(req,resp){
    Course.find({}).exec(function(err,collection){
        resp.send(collection);
    });
};