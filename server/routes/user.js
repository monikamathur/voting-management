var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('./../models/User');
const { check, validationResult } = require('express-validator/check');
var auth = require('../middleware');
var validator = require('../validation')

// Api for add user 
router.post('/',  auth.checkToken, auth.isAdmin,validator.createValidationFor('addUser'), validator.checkValidationResult,
 (req, res, next) => {
  let newUser = new User();

  // intialize newUser object with request data 
  newUser.user_name = req.body.user_name;

  newUser.user_id = req.body.user_id;
  newUser.user_type = req.body.user_type;
  // call setPassword function to hash password 
  newUser.setPassword(req.body.password);
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).send({
        message: "Failed to add user."
      });
    }
    else {
      return res.status(201).send({
        message: "User added succesfully."
      });
    }
  })
});

// Api for get user by id
router.get('/:id', auth.checkToken, validator.createValidationFor('getOneUser'), validator.checkValidationResult, function (req, res, next) {
  User.find({ user_id: req.params.id }, function (err, post) {
    if (err) {
      return res.status(400).send({
        message: "Can not find the user"
      });
    }
    res.json(post);
  });
});

// Api for get list of all
router.get('/', auth.checkToken, auth.isAdmin, function (req, res, next) {
  User.find({ user_type: 'customer' }, { 'user_name': true, 'user_id': true, 'is_voted': true }, function (err, post) {
    if (err) {
      return res.status(400).send({
        message: "No data found"
      });
    }
    res.json(post);
  });
});


module.exports = router;
