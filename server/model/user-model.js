const mongoose= require('mongoose');
const connectDB= require('../db/index');

connectDB();

const userSchema= mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    }],
    profileimage: String,
    refreshtoken: String,
    isverified: {
        type: Boolean,
        default: false
    },
    verifytoken: String,
    forgetpasswordtoken: String,
},{
    timestamps: true
})


module.exports= mongoose.models.users || mongoose.model('users', userSchema);
