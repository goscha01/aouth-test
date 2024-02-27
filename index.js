const express = require('express');
const authRoutes = require('./routes/auth-routs');
const passportSetup = require('./config/pasport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

// set up view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 *1000,
    keys: [keys.session.cookieSession]
}))

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongoDB
mongoose.connect(keys.mongodb.dbURI)
.then(() => 
    console.log('connected to mongodb')) 
.catch((err) => {console.error(err)});


// set up routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home')
});

app.listen(3000, () => {
    console.log('app now listening for request on port 3000');
});