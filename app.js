var express = require('express');
var path = require('path');
var ejs = require('ejs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');

var db = require("./models/db");
var Routes = require('./routes');
var setUpPassport = require("./config/setuppassport");
setUpPassport();

var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//app.engine('jade', jade.renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

app.use(cookieParser());
app.use(session({
    secret: 'This is a secret string',
    resave: true,
    saveUninitialized: true    
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

//Uses path.join to find the path where the file should be
app.use(require('stylus').middleware(path.join(__dirname, 'app')));
app.use(express.static(path.join(__dirname, 'app')));
//public提供文件
app.use(express.static(path.join(__dirname, 'app')));
//tmp/build中提供编译好之后的文件
//app.use(express.static(path.join(_dirname, 'tmp/build')));
app.use('/users', express.static('app'));
//put all the avatar images in a common path and serve that path as regular assets
//app.use('/avatar', express.static(path.join(__dirname, 'img')));

//Turn on routing middleware
app.use(Routes);

//building an API: parsing requests, setting HTTP status codes, and sending JSON
//app.use('/api', apiRouter);


// This is the last one in the middleware stack
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);//To enter error mode
});

// development error handler will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler 
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
