var mongoose = require('mongoose');
var config = require('../config')
var crypto = require('crypto');
var UserSchema = new mongoose.Schema({
    user_id: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    user_name: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    user_type: {
        type: String,
        required: true
    },
    hash : String, 
    salt : String 
});

UserSchema.methods.setPassword = function(password) { 
     
    // creating a unique salt for a particular user 
       this.salt = crypto.randomBytes(16).toString('hex'); 
     
       // hashing user's salt and password with 1000 iterations, 
    //    64 length and sha512 digest 
       this.hash = crypto.pbkdf2Sync(password, this.salt,  
       1000, 64, `sha512`).toString(`hex`); 
   };

   UserSchema.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
}; 

var User = mongoose.model('User', UserSchema);
module.exports = User;
