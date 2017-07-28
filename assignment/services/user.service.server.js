module.exports = function(app){

    var userModel = require('../model/user/user.model.server');
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser); // choose what to put in cookie
    passport.deserializeUser(deserializeUser); // when cookie comes back from client to unwrap cookie to get id
    var bcrypt = require("bcrypt-nodejs");

    app.post("/api/user", createUser);
    app.get("/api/user", findUserByUsername);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // app.get("/api/user", findUserByCredentials);

    app.post  ('/api/user/login', passport.authenticate('local'), login);
    app.post  ('/api/user/logout', logout);
    app.post  ('/api/user/register', register);


    app.get('/api/user/loggedin', loggedIn);

    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

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

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);

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
            .findUserByCredentials(username, password)
            .then(function(user) {
                if(user) {
                    // notify passport (call back function done
                    // error, successful
                    done(null, user);
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

        // if(user && bcrypt.compareSync(password, user.password)) {
        //     return done(null, user);
        // } else {
        //     return done(null, false);
        // }

        res.json(req.user);
    }

    // function login(req, res, next) {
    //     passport.authenticate('local', function (err, user, info) {
    //         if (err) {
    //             return next(err);
    //         }
    //         if (!user) {
    //             return res.status(401).send(info.message);
    //         }
    //         req.logIn(user, function (err) {
    //             if (err) {
    //                 return next(err);
    //             }
    //             return res.json(user);
    //         });
    //     })(req, res, next);
    // }

    function createUser(req, res){
        var user = req.body;
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
        if (username && password) {
            username
                .findUserByUsername(username)
                .then(function(user) {
                    if (user) {
                        if (bcrypt.compareSync(passport, user.password)) {
                            res.json(user);
                        } else {
                            res.status(404).send("Incorrect Password");
                        }
                    } else {
                        res.send(404).send("Incorrect Username/Password");
                    }
                }, function(err) {
                    res.send(404).send("Incorrect Username/Password");
                })
        }
        // if(user && bcrypt.compareSync(password, user.password)) {
        //     return done(null, user);
        // } else {
        //     return done(null, false);
        // }
        // userModel
        //     .findUserByUsername(username)
        //     .then(function (user) {
        //         if(user) {
        //             res.json(user);
        //             return;
        //         } else {
        //             res.sendStatus(404);
        //         }
        //     });
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
            });
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var updatedUser = req.body;
        // if (updatedUser.newPassword) {
        //     updatedUser.password = bcrypt.hashSync(updatedUser.newPassword);
        //     delete updatedUser.newPassword;
        // }
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


