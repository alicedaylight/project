var mongoose = require("mongoose");
var makeupSchema = require('./makeup.schema.server.js');
var makeupModel = mongoose.model('MakeupModel', makeupSchema);

module.exports = makeupModel;

// makeupModel.createUser = createUser;
// makeupModel.findUserById = findUserById;
// makeupModel.findAllUsers = findAllUsers;
// makeupModel.findUserByUsername = findUserByUsername;
// makeupModel.findUserByCredentials = findUserByCredentials;
// makeupModel.updateUser = updateUser;
// makeupModel.deleteUser = deleteUser;
// makeupModel.addWebsite = addWebsite;
// makeupModel.deleteWebsite = deleteWebsite;
// makeupModel.findUserByFacebookId = findUserByFacebookId;
//
// module.exports = makeupModel;
//
// function findUserByFacebookId(facebookId) {
//     return User.findOne({'facebook.id': facebookId});
// }
//
//
// function createUser(user) {
//     return userModel.create(user);
// }
//
// function findUserById(userId) {
//     return userModel.findById(userId);
// }
//
// function findAllUsers() {
//     return userModel.find();
// }
//
// function findUserByUsername(username) {
//     return userModel.findOne({username: username});
// }
//
// function findUserByCredentials(username, password) {
//     return userModel.findOne({username: username, password: password});
// }
//
// function updateUser(userId, newUser) {
//     delete  newUser.username;
//     delete  newUser.password;
//     return userModel.update({_id: userId}, {$set: newUser});
// }
//
// function deleteUser(userId) {
//
//     return userModel
//         .remove({_id: userId});
// }
//
// function addWebsite(userId, websiteId) {
//     return userModel
//         .findById(userId)
//         .then(function (user) {
//             user.websites.push(websiteId);
//             return user.save();
//         });
// }
//
// function deleteWebsite(userId, websiteId) {
//     return userModel
//         .findById(userId)
//         .then(function (user) {
//             var index = user.websites.indexOf(websiteId);
//             user.websites.splice(index, 1);
//             return user.save();
//         });
// }

