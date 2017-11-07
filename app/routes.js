// Handles all routes in the app

module.exports = (app, passport) => {

    app.get('/', (req, res) => {
      res.render('index.ejs');
    })

    //
    app.get('/login', (req, res) => {
      res.render('login.ejs', { message: req.flash('loginMessage') });
    })

    app.post('/login', passport.authenticate('login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }))

    // Signup message
    app.get('/signup', (req, res) => {
      res.render('signup.ejs', { message: req.flash('signupMessage') });
    })

    app.post('/signup', passport.authenticate('signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }))

    // Shows the profile of an user
    app.get('/profile', isLoggedIn, (req, res) => {
      res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    })

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}
