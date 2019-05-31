var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Candidate = require('../models/Candidate');
const { check, validationResult } = require('express-validator/check');
var User = require('../models/User');
var auth = require('../middleware');
var validator = require('../validation')

router.get('/', auth.checkToken, auth.isAdmin, (req, res, next) => {

  Candidate.find({}, (err, candidate) => {
    if (err) {
      return res.status(400).send({
        message: "Failed to add candidate."
      });
    }
    else {
      return res.status(201).send(candidate);
    }
  })
  // User.create()
});

router.post('/',   validator.createValidationFor('addCandidates'), validator.checkValidationResult, (req, res, next) => {
  let newCandidate = new Candidate();

  // intialize newUser object with request data 
  newCandidate.candidate_id = req.body.candidate_id;
  newCandidate.candidate_name = req.body.candidate_name;
  newCandidate.candidate_sign = req.body.candidate_sign;
  newCandidate.candidate_party = req.body.candidate_party;

  newCandidate.save((err, candidate) => {
    if (err) {
      return res.status(400).send({
        message: "Failed to add candidate."
      });
    }
    else {
      return res.status(201).send({
        message: "candidate added succesfully."
      });
    }
  })
  // User.create()
});

router.put('/vote', auth.checkToken,validator.createValidationFor('vote'), validator.checkValidationResult, (req, res, next) => {
  User.find({ user_id: req.body.user_id }, (err, user) => {
    if (err) {
      return res.status(400).send({
        message: "Failed to get user"
      });
    }
    if (!user.length) {
      return res.status(400).send({
        message: "User not found"
      });
    } else if (user && !user[0].is_voted) {
      Candidate.update({ candidate_id: req.body.candidate_id }, { $inc: { candidate_vote: 1 } }, (err, candidate) => {
        if (err) {
          return res.status(400).send({
            message: "Failed to vote candidate."
          });
        }
        else {
          User.update({ user_id: req.body.user_id }, { $set: { is_voted: true } }, (err, user) => {
            if (err) {
              return res.status(400).send({
                message: "Failed to vote candidate."
              });
            }
            else {
              return res.status(201).send({
                message: "vote succesfully."
              });
            }
          })
        }
      })
    } else {
      return res.status(400).send({
        message: "You have already voted"
      });
    }
  })

  // User.create()
});
module.exports = router;
