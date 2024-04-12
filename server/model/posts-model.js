const mongoose= require('mongoose');
const connectDB= require('../db/index');

connectDB();

const commentSchema= mongoose.Schema({
    comment: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
})

const postSchema= mongoose.Schema({
    imageurl: {
        type: String,
        required: true
    },
    caption: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    likes: {
        type: Array,
        default: []
    },
    comments: [commentSchema]
},{
    timestamps: true
})


module.exports= mongoose.models.Posts || mongoose.model('Posts', postSchema);