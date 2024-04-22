var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NOVA' });
});

router.get('/auth/google',passport.authenticate(
  'google',
  {
    scope: ['profile','email']
  }
));

  // router.get('/oauth2callback', passport.authenticate(
  //   'google',
  //   {
  //     successRedirect: '/home',
  //     failureRedirect: '/home'
  //   }
  // ));


  router.get('/oauth2callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(`/users/profile/${req.user.id}`);
  });

  router.get('/logout', function(req, res , next) {
      // req.logout();
      // res.redirect('/');
      req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
  });

module.exports = router;
