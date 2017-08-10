(function() {
    angular
        .module("WebAppMaker")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {

        var services = {
            "createReviewForUser" : createReviewForUser,
            "findAllReviewsForUser" : findAllReviewsForUser,
            "updateReview" : updateReview,
            "deleteReviewFromUser" : deleteReviewFromUser,
            "removeReviewFromLikes" : removeReviewFromLikes,
            "addReviewToLikes" : addReviewToLikes,
            "findAllLikesForUser" : findAllLikesForUser,
            "findAllLikedReviewsForUser" : findAllLikedReviewsForUser

        };

        return services;

        function findAllLikedReviewsForUser() {
            var url ="/api/reviews/liked";

            return $http.get(url)
                .then(function(response) {
                    return response.data;
                })
        }

        function createReviewForUser(userId, review) {

            var url = "/api/reviews/user";

            return $http.post(url, review)
                .then(function(response) {
                    // console.log(response);
                    return response.data;
                });
        }

        function addReviewToLikes(userId, review) {
            var url = "/api/reviews/user/likes";
        console.log("add review to likes", review);
            return $http.post(url, review)
                .then(function(response) {
                    return response.data;
                })
        }

        function deleteReviewFromUser(userId, reviewId) {
            var url ="/api/review/" + userId + "/" + reviewId;
            return $http.delete(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function removeReviewFromLikes(userId, reviewId) {
            var url = "/api/like/" + userId + "/" + reviewId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateReview(reviewId, review) {
            var url = "/api/review/" + reviewId;

            return $http.put(url, review)
                .then(function(response) {
                    return response.data;
                });

        }

        //
        // app.get('/api/reviews', findAllReviews);
        // app.post('/api/review/user', createReviewForUser);
        // app.get('/api/review/user', findAllReviewsForUser);
        //


        // same as jose's findAllWebsitesForUser
        function findAllReviewsForUser() {
            var url = "/api/reviews/user";

            return $http.get(url)
            //unwrap response
                .then(function (response) {
                    // return as embedded response
                    return response.data;
                });

        }

        function findAllLikesForUser() {
            var url = "/api/likes/user";

            return $http.get(url)
                .then(function(response) {
                    return response.data;
                })
        }
    }
})();