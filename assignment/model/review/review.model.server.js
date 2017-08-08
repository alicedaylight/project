var mongoose = require("mongoose");
var reviewSchema = require('./review.schema.server');
var reviewModel = mongoose.model('Review', reviewSchema);
var userModel = require('../user/user.model.server');

reviewModel.createReviewForUser = createReviewForUser;
reviewModel.findAllReviews = findAllReviews;
reviewModel.findAllReviewsForUser = findAllReviewsForUser;
reviewModel.updateReview = updateReview;
reviewModel.deleteReviewFromUser = deleteReviewFromUser;

module.exports = reviewModel;


function updateReview(reviewId, review) {
    return reviewModel.update({
        _id : reviewId
    }, {
        name : review.name,
        desc : review.desc
    });
}

function deleteReviewFromUser(userId, reviewId) {
    return reviewModel
        .remove({_id : reviewId})
        .then(function(status) {
            return userModel
                .deleteReview(userId, reviewId);
        });
}

function createReviewForUser(userId, review) {
    // reference back to parent is the username you gave me
    // stored in the scehma as a userId which is objectId
    review._user = userId;
    return reviewModel.create(review)
        .then(function(review) {
            console.log('createReviewForUser: review, ', userId, review);
            return userModel // return as a promise
                .addReview(userId, review._id)
        });
}

function findAllReviewsForUser(userId) {
    console.log('model.server.js', userId);
    return userModel
        .findOne({_id :userId})
        .populate('reviews')
        .exec()
        .then(function (user) {
            console.log('populate reviews', userId, user);
            return user.reviews;
        })
        .catch(function (err) {
            console.log('review.model.server.js err', err);
            return err;
        });

}

function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({_user: userId})
        .populate('_user')
        .exec();
    // I have a field that is a reference _user
    // I want you to convert that id into it's actual instance
    // that is referenced in another collection by that id
    // implemented by mongoose(abstraction layer)
    // exect string together transformation aka "go ahead"
}

function findAllReviews() {
    return reviewModel.find({});
}