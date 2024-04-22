var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
    displayName:String,
    firstName:String,
    lastName:String,
    email:String,
    avatar:String,
    googleId:String,
},{
    timestamps:true
});

module.exports = mongoose.model('User',userSchema);