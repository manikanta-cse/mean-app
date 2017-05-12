var auth = require('./auth');


module.exports = function (app) {
    app.get('/partials/*', function (req, resp) {
        resp.render('../../public/app/' + req.params[0]);
    });


    app.post('/login', auth.authenticate);

    app.get('*', function (req, resp) {
        resp.render('index');
    });


}