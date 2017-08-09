(function() {
    angular
        .module("WebAppMaker")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {

        var services = {
            "createReviewForUser" : createReviewForUser,
            "findAllReviewsForUser" : findAllReviewsForUser,
            "updateReview" : updateReview,
            "deleteReviewFromUser" : deleteReviewFromUser

        };

        return services;

        function createReviewForUser(userId, review) {

            var url = "/api/reviews/user";

            return $http.post(url, review)
                .then(function(response) {
                    console.log(response);
                    return response.data;
                });
        }

        function deleteReviewFromUser(userId, reviewId) {
            var url ="/api/review/" + userId + "/" + reviewId;
            return $http.delete(url)
                .then(function(response) {
                    return response.data;
                });
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
    }
})();