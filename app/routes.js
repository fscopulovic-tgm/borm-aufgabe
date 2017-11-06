// Handles all routes in the app

module.exports = function(app, passport) {

    app.get('/', (req, res) => {
      res.render('index.ejs');
    })

    //
    app.get('/login', (req, res) => {
      res.render('login.ejs', { message: req.flash('loginMessage') });
    })

    // Signup message
    app.get('/signup', (req, res) => {
      res.render('signup.ejs', { message: req.flash('signupMessage') });
    })

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
