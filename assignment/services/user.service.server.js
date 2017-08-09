module.exports = function(app){
    var userModel = require('../model/user/user.model.server');
    var passport = require('passport');

    // handle authentication
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth20').Strategy;

    // var FacebookStrategy = require('passport-facebook').Strategy;
    var googleConfig = {
        clientID: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));


    passport.use(new LocalStrategy(localStrategy));

    passport.serializeUser(serializeUser); // choose what to put in cookie
    passport.deserializeUser(deserializeUser); // when cookie comes back from client to unwrap cookie to get id


    var bcrypt = require("bcrypt-nodejs");


    app.get('/auth/google',
        passport.authenticate('google',
            { scope: ['profile', 'email']
            }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/#!/profile',
            failureRedirect: '/#!/home'
        }));


    app.post("/api/user", isAdmin, createUser);
    app.get("/api/user", findUserByUsername);
    // app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    //covered
    // app.get("/api/user", findUserByCredentials);

    app.post('/api/user/login', passport.authenticate('local'), login);
    app.post('/api/user/logout', logout);
    app.post('/api/user/register', register);
    app.post('/api/user/unregister', unregister);
    app.get('/api/user/loggedin', loggedIn);
    app.get('/api/user/checkAdmin', checkAdmin);
    app.get("/api/user/:userId", findUserById);
    app.get("/api/alluser/", isAdmin, findAllUsers);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", isAdmin, deleteUser);


    function isAdmin(req, res, next) {
        if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') !== -1) {
            next();
        } else {
            res.sendStatus(401);
        }
    }


    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            });
    }

    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(function(users) {
                if(users) {
                    res.json(users)
                } else {
                    res.status(404).send("Users not found");
                }
            }, function (err) {
                res.status(404).send("Users not found");
            });
    }


    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(function (user) {
                if (user) {
                    req.login(user, function () {
                        res.sendStatus(200);
                    }, function (err) {
                        res.status(400).send('User could not be created:' + err);
                    });
                }
                else {
                    res.status(400).send('User could not be created:' + err);
                }
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function unregister(req, res) {
        userModel
            .deleteUser(req.user._id)
            .then(function (user) {
                req.logout();
                res.sendStatus(200);
            });
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);

    }

    function checkAdmin(req, res) {
        if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    // way to validate our session
    function loggedIn(req, res) {
        // console.log(req.user);
        if (req.isAuthenticated()) {
            // console.log("sending user to client");
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    // intercept the post request and parse from the body the username and passpord attribute
    function localStrategy(username, password, done) {
        userModel
        // .findUserByCredentials(username, password)
            .findUserByUsername(username)
            .then(function(user) {
                if(user) {
                    if(bcrypt.compareSync(password,user.password)) {
                        done(null, user);
                    } else {
                        done(null, false, {msg:'Incorrect password!'});
                    }

                } else {
                    // false no current user, user not found
                    // abort http request (client receieve unauthorized error)
                    done(null, false);
                }
            }, function (error) {
                done(error, false);
            });
    }

    function login(req, res) {
        // sends back the user that's been found.. echo it back to client
        res.json(req.user);
    }

    function createUser(req, res){
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.send(error);
            });
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        console.log("find user by name: " +username);

        userModel
            .findUserByUsername(username)
            .then(function(user) {
                if (user) {
                    res.json(user);
                } else {
                    res.send(404).send("Could not find user: " + username);
                }
            }, function(err) {
                res.send(404).send("user mode err:" + err);
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        // console.log("hello from service");
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user) {
                    res.json(user);
                }  else {
                    res.sendStatus(404);
                }
            });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }).catch(function (err) {
            res.status(500).send(err);
        });
    }

    function updateUser(req, res) {
        var userId = req.params.userId;

        var updatedUser = req.body;
        // updatedUser.password = bcrypt.hashSync(updatedUser.password);

        userModel
            .updateUser(userId, updatedUser)
            .then(function (status) {
                res.send(status);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function (status) {
                res.send(status);
            });
    }

    // put the entire user into the cookie
    // encoded in the headers as they go to the client
    function serializeUser(user, done) {
        done(null, user);
    }

    // same header come back and parsed and passed into deserializeUser user
    // intercepting every single request and making sure person has authority to access
    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

};