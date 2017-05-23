var Course= require('mongoose').model('Course');

exports.getCourses=function(req,resp){
    Course.find({}).exec(function(err,collection){
        resp.send(collection);
    });
};

exports.getCourseById=function(req,resp){
    Course.findOne({_id:req.params.id}).exec(function(err,course){
        resp.send(course);
    });
};