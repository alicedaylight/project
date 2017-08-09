module.exports = function(app) {
    var reviewModel = require('../model/review/review.model.server');


    app.get('/api/reviews', findAllReviews);
    app.post('/api/reviews/user', createReviewForUser);
    app.post('/api/reviews/user/likes', addReviewToLikes);
    app.get('/api/reviews/user', findAllReviewsForUser);
    app.delete('/api/review/:userId/:reviewId', deleteReviewFromUser);
    app.put('/api/review/:reviewId', updateReview);



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
       reviewModel
           .deleteReviewFromUser(userId, reviewId)
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
                console.log('review.service.server err', err);
                res.sendStatus(500);

            })
    }


    function createReviewForUser(req, res){
        // console.log("review server side req.user", req.user);
        var uid = req.user._id;
        var review = req.body;

        reviewModel
            .createReviewForUser(uid, review)
            .then(
                function(review){
                    res.json(review);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }


    function addReviewToLikes(req, res) {
        var uid = req.user._id;
        var review = req.body;

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
