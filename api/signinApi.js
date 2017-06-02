var express = require('express');
var bodyparser = require('body-parser');
var request = require('request');
var rp = require('request-promise');
var passwordHash = require('password-hash');
var session = require('express-session');
var app = express.Router();


app.post('/api/signin', function (req, res) {
    var request = {
        method: 'GET',
        uri: 'https://login-bd931.firebaseio.com/users.json?orderBy="email"&equalTo="' + req.body.email + '"',
        headers: {
            'Content-Type': "application/json"
        },
        json: true
    };

    rp(request)
        .then(function (repos) {
            if (Object.keys(repos).length == 0) {
                res.status(201).json({
                    "text": "User not found, you have to Regiser first",
                    "class": "info_show info_red",
                    "succes": false
                });
            } else {
                var resData = repos[Object.keys(repos)[0]];
                if (passwordHash.verify(req.body.password, resData.password)) {
                    delete resData.password;
                    sess = req.session;
                    sess.user = resData;
                    //console.log(sess.user);
                    //req.session.user = resData;

                    /*res.writeHead(301, {
                        Location: 'http://www.anattatechnologies.com/q/2014/03/node-js-redirect-with-query-string/'
                    });*/
                    res.status(201).json({
                        "text": "logged in",
                        "class": "info_show info_green",
                        "succes": true,
                        "user": resData
                    });
                } else {
                    res.status(201).json({
                        "text": "incorrect password",
                        "class": "info_show info_red",
                        "succes": false
                    });
                }
            }
        })
        .catch(function (err) {
            res.status(201).json(err);
        });

});
module.exports = app;
