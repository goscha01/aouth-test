const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys')


passport.use(new GoogleStrategy({
    // OPTIONS FOR THE GOOGLE STRATEGY
    callbackURL:'/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, (accesToken, refreshToken, profile, done) => {
    // PASSPORT CALLBACK FUNSTION
    console.log('passport callback');
    console.log(profile);
})
);