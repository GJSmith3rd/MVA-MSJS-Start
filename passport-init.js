/// <reference path="typings/tsd.d.ts"/>

var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

//temporary data store
//var users = {};

//mongodb mongoose data store
var mongoose = require('mongoose');

//connect to mongodb data store User
var User = mongoose.model('User');
var Post = mongoose.model('Post');

module.exports = function (passport) {

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions

    //serialize and return object
    passport.serializeUser(function (user, done) {

        //passport userid for user
        console.log('serializing user:', user.username);

        //return unique id for user
        done(null, user._id);
    });

    //deserialize and return user object
    passport.deserializeUser(function (username, done) {
        
        //return unique id for user
        User.findById(username, function (err, user) {

            console.log('deserializing user:', user.username);
            done(err, user);

        });

    });

    passport.use('signup', new LocalStrategy({
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },

        function (req, username, password, done) {

            User.findOne({ username: username }, function (err, user) {
                // In case of any error, return using the done method
                if (err) {

                    console.log('Error in SignUp: ' + err);
                    return done(err)
                }

                if (user) {

                    //User already signed up
                    console.log('User already exists with username: ' + username);
                    return done(null, false);

                } else {

                    // if there is no user, create the user
                    console.log('Create username: ' + username);
                    var newUser = new User();

                    // set the user's local credentials
                    newUser.username = username;
                    newUser.password = createHash(password)

                    // save the user
                    newUser.save(function (err) {

                        if (err) {
                            console.log('Error in Saving user: ' + err);
                            throw err;
                        }

                        console.log(newUser.username + ' successfully signed up');

                        return done(null, newUser);

                    });
                }
            });

        })
        );

    passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
        function (req, username, password, done) {

            User.findOne({ username: username }, function (err, user) {
                // In case of any error, return using the done method
                if (err) {
                    console.log('Error in login: ' + err);
                    return done(err)
                }

                if (!user) {
                    //User not signed up
                    return done('user ' + username + ' not found!', false);
                }

                if (!isValidPassword(user, password)) {
                    //wrong password
                    return done('incorrect password ', false);
                }

                return done(null, true);
            });
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