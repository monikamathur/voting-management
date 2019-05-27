var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User');

router.post('/', (req, res) => {
    if(req.body){
      console.log('req', req.body)
    }
    // User.create()
});