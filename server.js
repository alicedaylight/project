var express = require('express');

//initialize app as an express application
var app = express();

// var cookies = require('cookies');
// var sessions = require('sessions');


var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// hashtable, instantiates cookie session
// depends on the user, will call a different hashtable
app.use(session({
    secret: "this is the secret",
    resave : true,
    saveUninitialized : true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


var mongoose = require('mongoose');

var routeServices = require('./assignment/app');
routeServices(app);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname+'/public/assignment'));
// remove 'public' so that the static will start from cs5610 directory and not public


var connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/cs5610';
mongoose.connect(connectionString);


app.post('/api/createuser',function (req, res) {
    var user = req.body;

    console.log("user: " + user.username + " " + user.password);
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port outside lalala', app.get('port'));
});

