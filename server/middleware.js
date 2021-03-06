let jwt = require('jsonwebtoken');
const config = require('./config.js');

/**
 * checkToken is a middileware to check if api has an
 * Authorization token and it should be valid
 */
let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; 
  // Express headers are auto converted to lowercase

  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }


  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(400).json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

/**
 * isAdmin is a middileware to check that api should be accessible for the admin user only
 */
let isAdmin = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; 
  // Express headers are auto converted to lowercase
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }


  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        if(decoded && decoded.userType == 'admin'){
          next();
        }else{
          return res.status(401).json({
            success: false,
            message: 'You are not authorised.'
          });
        }
      }
    });
  } else {
    return res.status(400).json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken,
  isAdmin: isAdmin
}