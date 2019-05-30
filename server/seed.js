var User = require('./models/User');
var Candidate = require('./models/Candidate');
var async = require('async');
var userData = require('./user.json');
var candidateData = require('./candidates.json');
var async = require("async");

async.forEachOf(userData, (value, callback) => {
    let newUser = new User();
    newUser.user_name = value.user_name;

    newUser.user_id = value.user_id;
    newUser.user_type = value.user_type;
    newUser.setPassword(value.password);
    newUser.save((err, res) => {
        console.log("inserted");
    })

}, err => {
    if (err) console.error(err.message);
    // configs is now a map of JSON data
});

Candidate.insertMany(candidateData, (err, res) => {
    if (err) console.error(err.message);
    console.log("inserted");
})
