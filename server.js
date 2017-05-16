var express = require('express');
 
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'developement';

var app = express();

//config
var config = require('./server/config/config')[env];

//express
require('./server/config/express')(app, config);

//database
require('./server/config/mongoose')(config);

//database
require('./server/config/passport')();

// app.use(function(req,resp,next){
//     console.log(req.user);
//     next();
// });

//creating schema
// var messageSchema = mongoose.Schema({ message: String });
// var Message = mongoose.model('Message', messageSchema);
// var mongoMessage;

// Message.findOne().exec(function (err, messageDoc) {
//     mongoMessage = messageDoc.message;
// });

//routes
require('./server/config/routes')(app);

app.listen(config.port);
console.log('Server running '+ config.port);