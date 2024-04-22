var passport = require('passport');
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; ----- > THIS IS THE OLD VERSION
// var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
var User = require('../models/user');
var mongoose = require('mongoose');
const user = require('../models/user');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK,
},async function(accessToken, refreshToken, profile, cb){
  // console.log("we are here passssssssssssport ---------->>>>>>> " , profile);
   User.findOne({googleId: profile.id}).then((user) => {
    // console.log("inja usera migardim peida konim --->  " , user);
        if (user) {
          // returning user
          return cb(null, user);
        } else {
          // we have a new user via OAuth!
          // console.log("findone toye else");
          var newUser = new User({
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            googleId: profile.id
          });
          // console.log(newUser , "Adding the new user to the database --------<<<<<<<");
          newUser.save(newUser).then((user) => {
            return cb(null, user);
          })
        }
   })
    /*****  throw new MongooseError('Model.findOne() no longer accepts a callback');  *******/
    // User.findOne({googleId: profile.id}, function(err, user) {
    //   console.log("findone ghabl error check")
    //     if (err) {
    //       console.log("findone vasat error ");
    //       return cb(err)
    //     };
    //     console.log("findone bade error ");
    //     if (user) {
    //       // returning user
    //       return cb(null, user);
    //     } else {
    //       // we have a new user via OAuth!
    //       console.log("findone toye else");
    //       var newUser = new User({
    //         name: profile.displayName,
    //         email: profile.emails[0].value,
    //         avatar: profile.photos[0].value,
    //         googleId: profile.id
    //       });
    //       console.log(newUser);
    //       newUser.save(function(err) {
    //         if (err) return cb(err);
    //         return cb(null, newUser);
    //       });
    //     };
    //   });
    }));

    // ////////  NOT SURE WHAT IT DOES BUT I THINK THEY SET THE USER KEY IN REQ OBJECT ////////////// 
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });
   