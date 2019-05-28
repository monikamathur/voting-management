var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('./../models/User');
const { check, validationResult } = require('express-validator/check');

router.post('/', [
  check('user_id', 'sdfsdfsf').not().isEmpty(),
  check('user_name', 'sdfsdfsdf').not().isEmpty(),
  check('password', 'Your password must be atleast 5 characters').not().isEmpty()
], (req, res, next) => {
  let newUser = new User();

  // intialize newUser object with request data 
  newUser.user_name = req.body.user_name;

  newUser.user_id = req.body.user_id;
  newUser.user_type = req.body.user_type;
  // call setPassword function to hash password 
  newUser.setPassword(req.body.password);
  console.log(newUser)
  newUser.save((err, user) => {
    console.log("user", user)
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
  // User.create()
});

module.exports = router;
