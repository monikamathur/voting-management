var mongoose = require('mongoose');

var CandidateSchema = new mongoose.Schema({
    candidate_id: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    candidate_name: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    candidate_sign: {
        type: String,
        required: true,
        unique: true,
    },
    candidate_party: {
        type: String,
        required: true,
        unique: true,
    },
    candidate_vote: {
        type: Number,
        default: 0
    }
}, { emitIndexErrors: true });

/**
 * handleE11000 is a method to retuen an error if duplicate entry
 */
var handleE11000 = function (error, res, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'));
    } else {
        next();
    }
};
CandidateSchema.post('insertMany', handleE11000);
CandidateSchema.post('save', handleE11000);
CandidateSchema.post('update', handleE11000);
CandidateSchema.post('findOneAndUpdate', handleE11000);

var Candidate = mongoose.model('Candidate', CandidateSchema);
module.exports = Candidate;