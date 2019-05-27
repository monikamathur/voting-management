var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Candidate = require('../models/Candidate');
const { check, validationResult } = require('express-validator/check');
var User = require('../models/User');

router.post('/', [
  check('candidate_id', 'sdfsdfsf').not().isEmpty(),
  check('candidate_name', 'sdfsdfsdf').not().isEmpty(),
  check('candidate_sign', 'sdfsdfsdf').not().isEmpty(),
  check('candidate_party', 'sdfsdfsdf').not().isEmpty(),
], (req, res, next) => {
  let newCandidate = new Candidate();

  // intialize newUser object with request data 
  newCandidate.candidate_id = req.body.candidate_id;
  newCandidate.candidate_name = req.body.candidate_name;
  newCandidate.candidate_sign = req.body.candidate_sign;
  newCandidate.candidate_party = req.body.candidate_party;

  newCandidate.save((err, candidate) => {
    console.log("user", candidate)
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

router.put('/vote', [
    check('candidate_id', 'sdfsdfsf').not().isEmpty(),
  ], (req, res, next) => {
  
    Candidate.update({candidate_id: req.body.candidate_id}, { $inc: { candidate_vote: 1 } },(err, candidate) => {
      console.log("user", candidate)
      if (err) {
        return res.status(400).send({
          message: "Failed to vote candidate."
        });
      }
      else {
        User.update({_id: req.body._id}, { $set: { is_voted: true} },(err, user) => {
            console.log("user", candidate)
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
    // User.create()
  });
module.exports = router;
