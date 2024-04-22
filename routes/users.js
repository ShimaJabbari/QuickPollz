var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');
var usersCtrl = require('../controllers/users');
const { post } = require('request');



// async function getUserInfo (id) {
//     return await User.findById(id);
// }
router.get('/profile/:id', function(req, res, next) {
    Post.find({ createdBy: req.params.id })
        .then((posts) => {
            res.render('./users/myProfile.ejs', {
                loggedInUser: req.user,
                posts: posts,
            });
        })
        .catch(err => {
            console.error('Error retrieving posts:', err);
            res.status(500).send("Error retrieving posts");
        });
});

module.exports = router;