/// <reference path="typings/tsd.d.ts"/>

var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
//temporary data store
var users = {};
module.exports = function (passport) {

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions

    //serialize and return object
    passport.serializeUser(function (user, done) {

        //passport userid for user
        console.log('serializing user:', user.username);
        return done(null, user.username);
    });

    //deserialize and return user object
    passport.deserializeUser(function (username, done) {
        return done(null, users[username]);
    });

    passport.use('signup', new LocalStrategy({
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },

        function (req, username, password, done) {

            //check if user already exists
            if (users[username]) {
                console.log('User already exists with username: ' + username);
                return done(null, false);
            }

            //add user to memory db
            console.log('Added user: ' + username)
            users[username] = {
                username: username,
                password: createHash(password)
            }

            //if no error return object
            console.log(users[username].username + ' Registration successful');
            return done(null, users[username]);
        })
        );

    passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
        function (req, username, password, done) {

            //check if user does not exists
            if (!users[username]) {
                console.log('User Not Found with username ' + username);
                return done(null, false);
            }

            //check for invalid password
            if (!isValidPassword(users[username], password)) {
                console.log('Invalid password ' + username);
                return done(null, false);
            }

            //successfully signed in
            console.log('successfully signed in');

            //if no error return user object
            return done(null, users[username]);
        }
        ));



    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};