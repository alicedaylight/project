var mongoose = require("mongoose");
var reviewSchema = require('./review.schema.server');
var reviewModel = mongoose.model('Review', reviewSchema);

var makeupSchema = require('../makeup/makeup.schema.server');
var makeupModel = mongoose.model('Makeup', makeupSchema);

var userModel = require('../user/user.model.server');

reviewModel.createReviewForUser = createReviewForUser;
reviewModel.addReviewToLikes = addReviewToLikes;
reviewModel.findAllReviews = findAllReviews;
reviewModel.findAllReviewsForUser = findAllReviewsForUser;
reviewModel.findAllLikesForUser = findAllLikesForUser;
reviewModel.updateReview = updateReview;
reviewModel.deleteReviewFromUser = deleteReviewFromUser;
reviewModel.removeReviewFromLikes = removeReviewFromLikes;

module.exports = reviewModel;


function updateReview(reviewId, review) {
    return reviewModel.update({
        _id : reviewId
    }, {
        name : review.name,
        desc : review.desc
    });
}

function deleteReviewFromUser(userId, reviewId, productId) {
    return reviewModel
        .remove({_id : reviewId})
        .then(function(status) {
            return userModel
                .deleteReview(userId, reviewId);
        })
        // I added this part below to remove the review from the review array in user
        // and also remove the review from the makeup array
        .then(function() {
            makeupModel
                .deleteReview(productId, reviewId);
        });
}

function removeReviewFromLikes(userId, reviewId) {
    return reviewModel
        .remove({_id : reviewId})
        .then(function(status) {
            return userModel
                .deleteLike(userId, reviewId);
        })
}

function createReviewForUser(userId, review, productId) {
    // reference back to parent is the username you gave me
    // stored in the schema as a userId which is objectId
    review._user = userId;
    review._productId = productId;

    return reviewModel.create(review)
        .then(function(review) {
            userModel
                .addReview(userId, review._id);
            return review;
        })
        .then(function (review) {
            // add review to makeup
            makeupModel
                .addReview(review);

        });
}

function addReviewToLikes(userId, review) {
    review._user = userId;
    return userModel
        .addLike(userId, review._id)
}

function findAllReviewsForUser(userId) {
    // console.log('model.server.js', userId);
    return userModel
        .findOne({_id :userId})
        .populate('reviews')
        .exec()
        .then(function (user) {
            // console.log('populate reviews', userId, user);
            return user.reviews;
        })
        .catch(function (err) {
            // console.log('review.model.server.js err', err);
            return err;
        });
}

function findAllLikesForUser(userId) {
    return userModel
        .findOne({_id: userId})
        .populate('likes')
        .exec()
        .then(function(user) {
            return user.likes;
        })
        .catch(function(err) {
            return err;
        })
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