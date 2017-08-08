(function() {
    angular
        .module("WebAppMaker")
        .controller("ReviewListController", ReviewListController)
        .controller("NewReviewController", NewReviewController)
        .controller("EditReviewController", EditReviewController);

    function ReviewListController(ReviewService, currentUser) {
        var vm = this;

        vm.uid = currentUser._id;


        ReviewService
            .findReviewsByUser(vm.uid)
            .then(renderReviews);

        function renderReviews(reviews) {
            vm.reviews = reviews;
        }
    }

    function NewReviewController(ReviewService, $location, currentUser) {
        var vm = this;
        vm.uid = currentUser._id;
        // vm.wid = $routeParams.wid;
        // vm.pid = $routeParams.pid;
        vm.newReview = newReview;

        function newReview(name, description) {
            console.log("name: " + name);
            if (name === undefined || name === null || name === "") {
                vm.error = "Name cannot be empty.";
                return;
            } else {
                var newReview = {
                    name: name,
                    desc: description
                };
                return ReviewService
                    .createReview(vm.uid, newReview)
                    .then(function (review) {
                        $location.url("/review");
                    });
            }
        }
    }

    function EditReviewController($routeParams, ReviewService, $location, currentUser) {
        var vm = this;
        vm.uid = currentUser._id;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        // view is left hand
        // view model.pid
        // config is right side from routeParam

        //event handler that listens for an incoming click
        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;

        // displays all of the reviews on the lefthand side of the page (same as review-list)

        vm.reviews = ReviewService.findReviewsByUser(vm.uid);

        ReviewService
            .findReviewById(vm.wid)
            .then(renderReview, reviewError);

        function renderReview(review) {
            vm.review = review;
        }

        function reviewError(error) {
            vm.error = "Review not found";
        }

        function updateReview(review) {
            if (review.name === undefined || review.name === null || review.name === "") {
                vm.error = "Name cannot be empty.";
                return;
            }
            ReviewService
                .updateReview(review._id, review)

                .then(function(review) {
                    $location.url("/review");
                });

        }

        function deleteReview(reviewId) {
            ReviewService
                .deleteReviewFromUser(vm.uid, vm.wid)
                .then(function() {
                    $location.url("/review");
                }, function () {
                    vm.error = "Unable to delete you";
                });
        }
    }

})();






















