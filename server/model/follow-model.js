const mongoose= require('mongoose');
const connectDB= require('../db/index');

connectDB();

const followSchema= new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    sentrequest: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    receivedrequest: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    pendingrequest: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    acceptedrequested: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
},{
    timestamps: true
});

module.exports= mongoose.models.Follows || mongoose.model('Follows', followSchema);