var express = require('express');
var request = require('request');
var rp = require('request-promise');
var curl = require('curl');
var app = express.Router();

/*app.get('/api/donateTest', function (req, res) {
    var request = {
        method: 'GET',
        uri: 'https://api.sandbox.paypal.com/v1/oauth2/token',
        auth: {
            'user': 'AcCmLH1BxIPz_XL15n7rcRZWHnJWNFYA9nylsvxGy6OWazWAF4LIEea4EHEDiMGEtFa0OnGr9RdWUvXn',
            'pass': 'EA7y8iQeMONJMQgicF80Nw8Sk24MPiKp_El6a_At4pO4ci2YQv5kxgDUbtZjGE_5YokHbvnVBvvNzPiV'
        },
        headers: {
            'Content-Type': "application/x-www-form-urlencoded"
        },
        body: {
            'grant_type': "client_credentials"
        },
        json: true
    };

    rp(request)
        .then(function (repos) {
            //        console.log(repos);
        })
        .catch(function (err) {
            console.log(err);
        });

});*/

app.get('/api/donateTest', function (req, res) {
    var request1 = {
        method: 'POST',
        uri: 'https://api.sandbox.paypal.com/v1/oauth2/token',
        headers: {
            'Content-Type': "application/x-www-form-urlencoded"
        },
        auth: {
            'user': 'AcCmLH1BxIPz_XL15n7rcRZWHnJWNFYA9nylsvxGy6OWazWAF4LIEea4EHEDiMGEtFa0OnGr9RdWUvXn',
            'pass': 'EA7y8iQeMONJMQgicF80Nw8Sk24MPiKp_El6a_At4pO4ci2YQv5kxgDUbtZjGE_5YokHbvnVBvvNzPiV'
        },
        body: {
            some: 'payload'
        },
        json: true
    };
    curl('www.google.com', {
        VERBOSE: 1,
        RAW: 1
    }, function (err) {
        console.info(this);
    });
    /*    rp(request)
            .then(function (repos) {
                delete repos.password;
                res.status(201).json(repos);
            })
            .catch(function (err) {
                res.status(201).json(err);
            });*/
});


module.exports = app;
