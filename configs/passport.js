// Handles the login and sign up

var localStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = (passport) => {

  // Used to serialize a user for the session
  passport.serializeUser((user, done) => {
        done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('signup', new localStrategy({
       // by default, local strategy uses username and password, we will override with email
       usernameField : 'email',
       passwordField : 'password',
       passReqToCallback : true
   },
   (req, email, password, done) => {
     if (!(~email.indexOf("@"))) {
       return done(null, false, req.flash('signupMessage', 'Invalide email adress'))
     } else {
     process.nextTick(() => {
       User.findOne({'email' : email }, (err, user) => {
         // if there are any errors, return the error
         if (err)
            return done(err);

         // check to see if theres already a user with that email
         if (user) {
           return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
         } else {
          // if there is no user with that email
          // create the user
           var newUser = new User();

           // set the user's local credentials
           newUser.email    = email;
           newUser.username = req.body['username']
           newUser.password = newUser.generateHash(password);

           // save the user
           newUser.save((err) => {
             if (err) throw err;
             return done(null, newUser)
          });
         }
        });
      });
    }
    }));
 };
