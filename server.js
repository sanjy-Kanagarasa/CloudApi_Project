var express = require('express');
var bodyparser = require('body-parser');
var passwordHash = require('password-hash');
var request = require('request');
var session = require("express-session");

var registerApi = require('./api/registerApi');
var signinApi = require('./api/signinApi');
var paypalApi = require('./api/paypalApi');

var app = express();

// Static file hosting
app.use('/', express.static('client'));


// Disconnect after CTRL+C
process.on('SIGINT', function () {
    console.log("Shutting down Mongo connection");
    process.exit(0);
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
var sess;
app.use(bodyparser.json());


app.use('/', registerApi);
app.use('/', signinApi);
app.use('/', paypalApi);


app.get('/api/session', function (req, res) {
    sess = req.session;
    //console.log(sess);

    //sess.user = resData;
    //sess.user = session.user;
    //    if (sess.user) {
    //        res.status(201).json({
    //            "succes": true,
    //            "session": sess.user
    //        });
    //    } else {
    //        res.status(201).json({
    //            "succes": false,
    //            "session": sess.user
    //        });
    //    }
});
app.get('/api/logout', function (req, res) {
    sess.user = null;
    if (sess.user = null) {
        res.status(201).json({
            "succes": true,
            "session": sess.user
        });
    }

});

app.listen(3001);
