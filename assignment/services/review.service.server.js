module.exports = function(app) {
    var reviewModel = require('../model/review/review.model.server');

    var userModel = require('../model/user/user.model.server');


    app.get('/api/reviews', findAllReviews);
    app.post('/api/reviews/user/:productId', createReviewForUser);
    app.post('/api/reviews/user/likes', addReviewToLikes);
    app.get('/api/reviews/user', findAllReviewsForUser);
    app.get('/api/likes/user', findAllLikesForUser);
    app.delete('/api/review/:userId/:reviewId/:productId', deleteReviewFromUser);
    app.delete('/api/like/:userId/:reviewId', removeReviewFromLikes);
    app.put('/api/review/:reviewId', updateReview);
    app.get('/api/reviews/liked', findAllLikedReviewsForUser);

    function findAllLikedReviewsForUser(req, res) {
        var userId = req.user._id;

        userModel
            .findAllLikesForUser(userId)
            .then(
                function(likes) {
                    res.json(likes);
                },
                function(error) {
                    res.status(400).send(error);
                }
            )
    }



    function updateReview(req, res) {
       var rid = req.params.reviewId;
       var review = req.body;
       reviewModel
           .updateReview(rid, review)
           .then(
               function(review){
                   res.json(review);
               },
               function (error) {
                   res.sendStatus(400).send(error);
               }
           );
   }


   function deleteReviewFromUser(req, res) {
       var reviewId = req.params.reviewId;
       var userId = req.params.userId;
       var productId = req.params.productId;

       reviewModel
           .deleteReviewFromUser(userId, reviewId, productId)
           .then(function(status) {
               res.send(status);
           })
   }

   function removeReviewFromLikes(req, res) {
        var reviewId = req.params.reviewId;
        var userId = req.params.userId;
        reviewModel
            .removeReviewFromLikes(userId, reviewId)
            .then(function(status) {
                res.send(status);
            })
   }

    function findAllReviews(req, res) {
        reviewModel
            .findAllReviews()
            .then(function (reviews) {
                res.json(reviews);
            });
    }

    function findAllReviewsForUser(req, res){
        reviewModel
            .findAllReviewsForUser(req.user._id)
            .then(
                function(reviews){
                    res.json(reviews);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            )
            .catch(function (err) {
                res.sendStatus(500);

            })
    }

    function findAllLikesForUser(req, res) {
        reviewModel
            .findAllLikesForUser(req.user._id)
            .then(
                function(likes) {
                    res.json(likes);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
            .catch(function(err) {
                res.sendStatus(500);
            })
    }


    function createReviewForUser(req, res){
        var uid = req.user._id;
        var review = req.body;
        var productId = req.params.productId;

        reviewModel
            .createReviewForUser(uid, review, productId)
            .then(
                function(review){
                    res.json(review);
                },
                function(error){
                    // the error from the console is coming from this line
                    //createReviewForUser err { MongoError: E11000 duplicate key error collection:
                    // cs5610.review index: _id_ dup key: { : ObjectId('598d087c0e5ca80b422a0fec') }
                    console.log('createReviewForUser err', error);
                    res.status(400).send(error);
                }
            );
    }


    function addReviewToLikes(req, res) {
        var uid = req.user._id;
        var review = req.body;
        console.log("SERVER SIDE ~~~~~~~~~~", review)


        reviewModel
            .addReviewToLikes(uid, review)
            .then(
                function(review) {
                    res.json(review);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            )

    }
};
