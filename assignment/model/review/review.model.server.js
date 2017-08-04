
var mongoose = require("mongoose");
var reviewSchema = require('./review.schema.server');
var reviewModel = mongoose.model('Review', reviewSchema);
var userModel = require('../user/user.model.server');

module.exports = reviewModel;


function createReviewForUser(userId, review) {
    // reference back to parent is the username you gave me
    // stored in the scehma as a userId which is objectId
    // review._user = userId;
    return reviewModel.create(review)
        .then(function(review) {
            return userModel // return as a promise
                .addReview(userId, review._id)
        });
}