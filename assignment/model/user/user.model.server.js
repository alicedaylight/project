var mongoose = require("mongoose");
var userSchema = require('./user.schema.server.js');
var userModel = mongoose.model('User', userSchema);

module.exports = userModel;

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addWebsite = addWebsite;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.findUserByGoogleId = findUserByGoogleId;


// keep
userModel.deleteReview = deleteReview;
userModel.addReview = addReview;
userModel.addLike = addLike;
userModel.deleteLike = deleteLike;


module.exports = userModel;

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}


function createUser(user) {
    if (user.roles) {
        user.roles = user.roles.split(',');
    } else {
        user.roles = ['USER'];
    }
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, newUser) {
    delete  newUser.username;
    delete  newUser.password;

    if(typeof  newUser.roles === 'string') {
        newUser.roles = newUser.roles.split(',');
    }
    console.log("model updateuser",  newUser);
    return userModel.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId) {

    return userModel
        .remove({_id: userId});
}

function addWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

function addReview(userId, reviewId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.reviews.push(reviewId);
            return user.save();
        });
}

function addLike(userId, reviewId) {
    return userModel
        .findById(userId)
        .then(function(user){
            user.likes.push(reviewId);
            return user.save();
        })
}

function deleteReview(userId, reviewId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.reviews.indexOf(reviewId);
            user.reviews.splice(index, 1);
            return user.save();
        });
}

function deleteLike(userId, reviewId) {
    return userModel
        .findById(userId)
        .then(function(user) {
            var index = user.likes.indexOf(reviewId);
            user.likes.splice(index, 1);
            return user.save();
        })
}
