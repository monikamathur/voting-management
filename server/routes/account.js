var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('./../models/User');
let jwt = require('jsonwebtoken');
const config = require('../config');
var validator = require('../validation')

router.post('/login',validator.createValidationFor('login'), validator.checkValidationResult, (req, res) => {
    User.findOne({ user_id: req.body.user_id }, function (err, user) {
        if (user === null) {
            return res.status(400).send({
                message: "User not found."
            });
        }
        else {
            if (user.validPassword(req.body.password)) {
                var token = jwt.sign({ userId: user.user_id, userType: user.user_type }, config.secret,
                    {
                        expiresIn: '24h'
                    });
                res.status(200).json({
                    user_id: user.user_id,
                    user_name: user.user_name,
                    user_type: user.user_type,
                    token
                })
            }
            else {
                return res.status(400).send({
                    message: "Invalid Password."
                });
            }
        }
    });
});

module.exports = router;
