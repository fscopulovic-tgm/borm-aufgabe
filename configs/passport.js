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
           newUser.name = req.body['username']
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
    }))
    passport.use('login', new localStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    (req, email, password, done) => { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, (err, user) => {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!(user.validPassword(password)))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });
    }));
};
