var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var router = express.Router(); //This the Router Instance as Singleton

var app = express();

var db;
var mongoDBUrl = "mongodb://localhost:27017/portal"; //DB name as portal
const MongoClient = require('mongodb').MongoClient;

/**
 * TODO: use a single router instance to create all routes.
 */
MongoClient.connect(mongoDBUrl, function(err, database) {
    if (err) {
        console.log("Mongo Connection failed", err);
        return;
    }else{
        console.info("Mongo Connected Successfully..!");
    }

    db = database; //database instance can pass to all routes where required

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    /**
     * Routes
     */
    var index = require('./routes/index')(router, db);
    var users = require('./routes/users')(router, db);
    var signup = require('./routes/signup')(router, db);

    //TODO: same as above use the rest fo routes and views
    app.use('/', index);
    app.use('/users', users);
    app.use('/signup', signup);

    app.use(express.static('public'));

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

});

module.exports = app;
