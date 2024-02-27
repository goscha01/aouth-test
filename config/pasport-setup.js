const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys')
const User = require('../models/user-model');


passport.use(new GoogleStrategy({
    // OPTIONS FOR THE GOOGLE STRATEGY
    callbackURL:'/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, (accesToken, refreshToken, profile, done) => {
    // check if user allready exists in DB
    User.findOne({googleId: profile.id}).then((currentUser) => {
        if(currentUser){
            console.log('esixting user : ' + currentUser);
        } else {
            new User({
                username: profile.displayName,
                googleId: profile.id
            }).save().then((newUser) => {
                console.log('new user created: ' + newUser);
            })
        }
    })

    
})
);