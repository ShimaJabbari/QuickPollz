var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');
const post = require('../models/post');




router.get('/',async (req, res) => {
        try {
            // Fetch all posts excluding those created by the logged-in user
            let postss = await Post.find({ createdBy: { $ne: req.user._id } }).exec();
            
            res.render('home', { // Assuming your homepage template is named 'home.ejs'
                posts: postss,
                loggedInUser : req.user,
                user: req.user
            });
    
        } catch (error) {
            console.error('Error fetching posts:', error);
            res.status(500).send("Error fetching posts");
        }
    });

// function isLoggedIn(req, res,next){
//     console.log("we are here 1");
//     if(req.isAuthenticated()){
//         console.log("we are here 2");
//       return next();}
//     res.redirect('/auth/google')
// }


module.exports = router;