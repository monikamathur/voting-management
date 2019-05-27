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
    candidate_sign:{
        type: String,
        required: true,
        unique: true,
    },
    candidate_party:{
        type: String,
        required: true,
        unique: true,
    },
    candidate_vote:{
        type: Number,
        default: 0
    }
});

var Candidate = mongoose.model('Candidate', CandidateSchema);
module.exports = Candidate;