var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema ({
    comment:String,
    visitorId: String,
    visitorAvatar: String,
    visitorName: String
},{
    timestamps:true
})
// var ratingSchema = new Schema ({
//     rating:Number,
//     visitorId: String,
//     visitorAvatar: String,
//     visitorName: String
// },{
//     timestamps:true
// })

var postSchema = new Schema({
    image: String,
    // rating: Number,
    // ratinArray: [ratingSchema],
    likes:[],
    caption: String,
    userId: String,
    displayName: String,
    avatar: String,
    comments:[commentSchema]

},{
    timestamps:true
})


module.exports = mongoose.model('Post',postSchema);