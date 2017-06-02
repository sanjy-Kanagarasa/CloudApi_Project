var express = require('express');
var bodyparser = require('body-parser');
var request = require('request');
var rp = require('request-promise');
var passwordHash = require('password-hash');
var app = express.Router();

app.post('/api/createUser', function (req, res) {
    var request = {
        method: 'POST',
        uri: 'https://login-bd931.firebaseio.com/users.json',
        headers: {
            'Content-Type': "application/json"
        },
        body: {
            "name": {
                "first": req.body.firstname,
                "last": req.body.lastname
            },
            "email": req.body.email,
            "password": passwordHash.generate(req.body.password)
        },
        json: true
    };
    var request_2 = {
        method: 'GET',
        uri: 'https://login-bd931.firebaseio.com/users.json?orderBy="email"&equalTo="' + req.body.email + '"',
        headers: {
            'Content-Type': "application/json"
        },
        json: true
    };

    rp(request_2)
        .then(function (repos) {
            if (Object.keys(repos).length == 0) {
                rp(request)
                    .then(function (repos) {

                        res.status(201).json({
                            "text": "User successfully created",
                            "class": "info_show info_green",
                            "succes": repos
                        });
                    })
                    .catch(function (err) {
                        res.status(201).json(err);
                    });
            } else {
                res.status(201).json({
                    "text": "Email already in use",
                    "class": "info_show info_red",
                    "succes": repos
                });
            }
        })
        .catch(function (err) {
            res.status(201).json(err);
        });

});

app.get('/api/getAllUsers', function (req, res) {
    var request = {
        method: 'GET',
        uri: 'https://login-bd931.firebaseio.com/users.json',
        headers: {
            'Content-Type': "application/json"
        },
        json: true
    };

    rp(request)
        .then(function (repos) {
            delete repos.password;
            res.status(201).json(repos);
        })
        .catch(function (err) {
            res.status(201).json(err);
        });
});

module.exports = app;
