var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');
var usersCtrl = require('../controllers/users');
const { post } = require('request');



// async function getUserInfo (id) {
//     return await User.findById(id);
// }
router.get('/profile/:id' , function(req,res,next) {
    Post.find({userId:req.params.id}).then((posts) => {
        var userPosts = posts ;
            res.render('./users/myProfile.ejs' , {
                loggedInUser : req.user, 
                posts : userPosts,
        
            })
    });

    router.get('/view/userprofile/:id' ,async function(req,res,next) {
        if(req.params.id == req.user.id ){
            res.redirect(`/users/profile/${req.user.id}`)
        }
        else {
            try {
                var userPost = await Post.find({userId:req.params.id})
                console.log(userPost);
                if (userPost.length == 0) {
                    var userProfile = await User.findOne({_id : req.params.id})
                    var post = [userProfile];
                    console.log(post);
                    res.render("./users/profile" , {
                        loggedInUser : req.user , 
                        posts : post,
                        hasPost : false
                    })
                }
                else {
                    res.render("./users/profile" , {
                        loggedInUser : req.user , 
                        posts : userPost,
                        hasPost : true
                    })
                }
            }
            catch (err) {
                console.log(err , "error in user router for userprofile");
                res.redirect("/");
            }
            
           
        }

    })
       
})

module.exports = router;