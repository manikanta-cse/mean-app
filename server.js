var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
};

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}));

app.use(express.static(__dirname + '/public'));

//database
if (env === 'development') {
    mongoose.connect('mongodb://localhost/multivision');//local instance
}
else {
    mongoose.connect('mongodb://mani:123456@ds137801.mlab.com:37801/meanwebapp'); //mongo db hosted on mlab
}



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function cb() {
    console.log('db opended!');
});

//creating schema
var messageSchema = mongoose.Schema({ message: String });
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;

Message.findOne().exec(function (err, messageDoc) {
    mongoMessage = messageDoc.message;
});

app.get('/partials/:partialPath', function (req, resp) {
    resp.render('partials/' + req.params.partialPath);
});

app.get('*', function (req, resp) {
    resp.render('index', { mongoMessage: mongoMessage });
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Server running');