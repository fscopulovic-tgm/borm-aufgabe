// COPIED THIS server.js FILE FROM THE TUTORIAL https://scotch.io/tutorials/easy-node-authentication-setup-and-local
// Only changed port and the secret for the session, otherwise it is the same file
var express   = require('express');
var app       = express();
var port      = process.env.PORT || 3000;
var couchbase = require('couchbase');
var passport  = require('passport');
var flash     = require('connect-flash');

var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./configs/database.js');

// configuration ===============================================================
var cluster = new couchbase.Cluster(configDB.url)
cluster.authenticate(configDB.USERNAME, configDB.PASSWORD);
var bucket = cluster.openBucket(configDB.bucketname);

require('./configs/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true})); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'sytistleiwand',
    resave: true,
    saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
var server = app.listen(port, function() {
  console.log("Started at port " + port);
});

module.exports.closeServer = function() {
  server.close();
}
