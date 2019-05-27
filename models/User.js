var mongoose = require('mongoose');

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
    password:{
        type: String,
        required: true
    }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
