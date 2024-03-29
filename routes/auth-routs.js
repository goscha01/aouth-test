const router = require ('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', {user: req.user});
})

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
    // handle with password
    res.send('logging out');
})

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));


// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'),(req, res) => {
    // res.send(req.user);
    res.redirect('/profile/');
});

module.exports = router;