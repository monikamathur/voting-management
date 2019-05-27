var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User');
const { check, validationResult } = require('express-validator/check');
let jwt = require('jsonwebtoken');
const config = require('../config');

router.post('/login', (req, res) => { 
  console.log('sdfsfsf')
  // find user with requested email 
  User.findOne({ user_id : req.body.user_id }, function(err, user) { 
      if (user === null) { 
          return res.status(400).send({ 
              message : "User not found."
          }); 
      } 
      else { 
          if (user.validPassword(req.body.password)) { 
            var token=jwt.sign({userId:user.id},config.secret);
            res.status(200).json({
                user_id:user.user_id,
                user_name:user.user_name,
                token
            })
          } 
          else { 
              return res.status(400).send({ 
                  message : "Wrong Password"
              }); 
          } 
      } 
  }); 
}); 

module.exports = router;
