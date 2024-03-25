var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverRide = require('method-override');
var session = require('express-session');
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var postsRouter = require('./routes/posts');
var searchRouter = require('./routes/search')


var app = express();
// ACCESSING .ENV FILES 
require('dotenv').config()
require('./config/database');
require('./config/passport');
require('./config/cloudinary');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('upload'))
// using method over ride for delete and put requests /////////
app.use(methodOverRide('_method'));
app.use(session({
  secret: 'NOVA',
  resave: false,
  saveUninitialized: true
}));
//Initialize passport
//Be sure to mount it after the session middleware and always before any of your routes are mounted that would need access to the current user:
app.use(passport.initialize());
//Intialize passport session.
app.use(passport.session());
// /////////////////// using routers //////////////////////////////////

app.use('/', indexRouter);
app.use('/home',homeRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/search', searchRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


// DATABASE_URL=mongodb+srv://NOVA:NOVA12345@nova.5tl2a2j.mongodb.net/?retryWrites=true&w=majority

// GOOGLE_CLIENT_ID=253552511896-rc7iomqvmf2qb830s8l3258u7pf3lc2m.apps.googleusercontent.com
// GOOGLE_CLIENT_SECRET=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
// GOOGLE_CALLBACK=http://localhost:3000/oauth2callback
// # GOOGLE_CALLBACK=http://localhost:3000/auth/google/callback

// CLOUDINARY_CLOUD_NAME=dpvyfpp4k
// CLOUDINARY_API_KEY=654783321611421
// CLOUDINARY_API_SECRET=rbbpZVnjrmjx1WuVmRMLY627zAg