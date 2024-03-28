const mongoose= require('mongoose');
const connectDB= require('../db/index');

connectDB();

const commentSchema= mongoose.Schema({
    comment: String,
    user: {
        type: mongoose.Schema.Types.ObjectId
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
        ref: 'users'
    },
    likes: {
        type: Array,
        default: []
    },
    comments: [commentSchema]
},{
    timestamps: true
})


module.exports= mongoose.models.posts || mongoose.model('posts', postSchema);