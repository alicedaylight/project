module.exports = function(app) {
    var reviewModel = require('../model/review/review.model.server');


    app.get('/api/reviews', findAllReviews);
    app.post('/api/reviews/user', createReviewForUser);
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
        console.log("review server side req.user", req.user);

        var uid = req.user._id;
        var review = req.body;

        reviewModel
            .createReviewForUser(uid, review)
            .then(
                function(review){
                    res.json(review);
                },
                function(error){
                    console.log(error);

                    res.sendStatus(400).send(error);
                }
            );
    }

    //
    // app.post('/api/user/:uid/website', createWebsite);
    // app.get('/api/user/:uid/website', findAllWebsitesForUser);
    // app.get('/api/website/:wid', findWebsiteById);
    // app.put('/api/website/:wid', updateWebsite);
    // app.delete("/api/user/:uid/website", deleteWebsitesByUser);
    // app.delete("/api/user/:uid/website/:wid", deleteWebsiteFromUser);
    //
    // function createWebsite(req, res){
    //     var uid = req.params.uid;
    //     var website = req.body;
    //     websiteModel
    //         .createWebsiteForUser(uid, website)
    //         .then(
    //             function(website){
    //                 res.json(website);
    //             },
    //             function(error){
    //                 console.log(error);
    //
    //                 res.sendStatus(400).send(error);
    //             }
    //         );
    // }
    //
    // function findAllWebsitesForUser(req, res){
    //     var uid = req.params.uid;
    //     websiteModel
    //         .findAllWebsitesForUser(uid)
    //         .then(
    //             function(websites){
    //                 res.json(websites);
    //             },
    //             function(error){
    //                 res.sendStatus(400).send(error);
    //             }
    //         );
    // }
    //
    // function findWebsiteById(req, res){
    //     var wid = req.params.wid;
    //     websiteModel
    //         .findWebsiteById(wid)
    //         .then(
    //             function(website){
    //                 res.json(website);
    //             },
    //             function(error){
    //                 res.sendStatus(400).send(error);
    //             }
    //         );
    // }
    //
    // function updateWebsite(req, res){
    //     var wid = req.params.wid;
    //     var website = req.body;
    //     websiteModel
    //         .updateWebsite(wid, website)
    //         .then(
    //             function (website){
    //                 res.json(website);
    //             },
    //             function (error){
    //                 res.sendStatus(400).send(error);
    //             }
    //         );
    // }
    //
    //
    // function deleteWebsiteFromUser(req, res) {
    //     var websiteId = req.params.wid;
    //     var userId = req.params.uid;
    //     websiteModel
    //         .deleteWebsiteFromUser(userId, websiteId)
    //         .then(function (status) {
    //             res.send(status);
    //         });
    // }
    //
    // function deleteWebsitesByUser(req, res) {
    //     var userId = req.params.uid;
    //     websiteModel
    //         .deleteWebsitesByUser(userId)
    //         .then(function (status) {
    //             res.send(status);
    //         });
    // }
};
