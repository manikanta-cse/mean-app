var auth = require('./auth'),
    users = require('../controllers/users'),
    courses = require('../controllers/courses'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');


module.exports = function (app) {

    app.get('/api/users', auth.requireRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    app.get('/api/courses', courses.getCourses);


    app.get('/partials/*', function (req, resp) {
        resp.render('../../public/app/' + req.params[0]);
    });


    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, resp) {
        req.logout();
        resp.end();
    });

     app.all('/api/*', function (req, resp) {
        resp.send(404);        
    });

    app.get('*', function (req, resp) {
        resp.render('index', {
            bootstrappedUser: req.user
        });
    });


}