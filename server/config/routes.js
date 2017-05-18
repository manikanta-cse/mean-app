var auth = require('./auth'),
    users=require('../controllers/users'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');


module.exports = function (app) {

    app.get('/api/users', auth.requireRole('admin'),users.getUsers);
    app.post('/api/users',users.createUser)

    app.get('/partials/*', function (req, resp) {
        resp.render('../../public/app/' + req.params[0]);
    });


    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, resp) {
        req.logout();
        resp.end();
    });

    app.get('*', function (req, resp) {
        resp.render('index', {
            bootstrappedUser: req.user
        });
    });


}