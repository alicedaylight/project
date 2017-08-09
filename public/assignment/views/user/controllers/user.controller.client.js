(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)
        .controller("HomeController", HomeController);

    // same as login
    function HomeController($location, UserService, currentUser) {
    // function HomeController($location, UserService) {

        var vm = this;
        vm.currentUser = currentUser;

        vm.login = login;

        function login(username, password) {
            if (username === undefined || username === null || username === "" || password === undefined || password === "") {
                vm.error = "Username and Passwords cannot be empty.";
                return;
            }

            UserService
                .login(username, password)
                // found is the user object
                .then(function(found) {
                    console.log(found);
                    if(found !== null) {
                        $location.url('/profile');
                    } else {
                        vm.message = "sorry," + username + " not found. please try again";
                    }
                });
        }

    }

    function LoginController($location, UserService) {
        console.log("inside login controller");
        // vm is a variable bound to the controller instance that allow controllers and views to exchange data and events
        var vm = this;
        // declares a variable named "login" on the left hand side of the assignment
        // assigns the function login (below) to this variable
        vm.login = login;

        function login(username, password) {
            if (username === undefined || username === null || username === "" || password === undefined || password === "") {
                vm.error = "Username and Passwords cannot be empty.";
                return;
            }

            UserService
                .login(username, password)
                // found is the user object
                .then(function(found) {
                    console.log(found);
                    if(found !== null) {
                        $location.url('/profile');
                    } else {
                        vm.message = "sorry," + username + " not found. please try again";
                    }
                });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;


        function register(username, password, vpassword) {
            if (username === undefined || username === null || username === "" || password === undefined || password === "") {
                vm.error = "Username and Passwords cannot be empty.";
                return;
            }
            if (password !== vpassword) {
                vm.error = "Password does not match.";
                return;
            }

            UserService
                .findUserByUsername(username)
                .then(function(error) {
                    vm.error = "Username already exists";
                }, function (error) {
                    var newUser = {
                        username : username,
                        password : password
                    };
                     UserService
                        .register(newUser)
                        .then(function() {
                            $location.url('/profile');
                        }, function(error) {
                            console.log(error);
                        });
                });

        }
    }

    // routeParams.. allow us to declare all of the 'when's' in config ngRoute
    //routeParams allow you to retrieve params from the route
    function ProfileController($timeout, UserService, $location, currentUser, ReviewService, WebsiteService) {
        var vm = this;
        //vm.uid = $routeParams.uid;
        vm.userId = currentUser._id;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        vm.unregister = unregister;
        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;
        vm.removeReviewFromLikes = removeReviewFromLikes;

        function logout() {
            UserService
                .logout()
                .then(function(){
                    $location.url('/home');
                });
        }

        function init() {
            renderUser(currentUser);
            findAllReviewsForUser();
        }

        init();

        function renderUser(user) {
            vm.user = user;
        }

        function updateUser(user) {
            vm.error = null;
            vm.message = null;

            UserService
                .updateUser(user._id, user)
                // id of entity you are updating and actual instance of obj
                // .updateUser(user._id, user)
                .then (function () {
                    vm.updated = "User update was successful!";
                    $timeout(function () {
                        vm.updated = null;
                    }, 3000);
                });
        }

        function unregister() {
            UserService
                .unregister()
                .then(function() {
                    $location.url('/home');
                });
        }


        function userError(error) {
            vm.error = "User not found";
        }

        function deleteUser(user) {
            UserService
                // server is going to come back with a promise and we need to handle it
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/');
                }, function () {
                    vm.error = "Unable to unregister you";
                });
        }


        function findAllReviewsForUser() {
            ReviewService
                .findAllReviewsForUser(vm.userId)
                .then(renderReviews);
        }

        function findAllLikesForUser() {
            ReviewService
                .findAllLikesForUser(vm.userId)
                .then(renderReviews);
        }


        // ReviewService
        //     .findAllReviewsForUser(vm.userId)
        //     .then(renderReviews);
        //
        function renderReviews(reviews) {
            vm.reviews = reviews;
        }



        WebsiteService
            .findWebsitesByUser(vm.userId)
            .then(renderWebsites);

        function renderWebsites(websites) {
            vm.websites = websites;
        }


        function updateReview(review) {
            if(review.name === undefined || review.name === null || review.name === "") {
                vm.error = "Name cannot be empty.";
                return;
            }

            ReviewService
                .updateReview(review._id, review)
                .then(function() {
                    findAllReviewsForUser();
                    // $location.url("/profile")
                });
        }

        function deleteReview(reviewId) {
            ReviewService
                .deleteReviewFromUser(vm.userId, reviewId)
                .then(function() {
                    findAllReviewsForUser();
                    // $location.url("/profile");
                }, function() {
                    vm.error = "Unable to delete the review";
                })
        }

        function removeReviewFromLikes(reviewId) {
            ReviewService
                .removeReviewFromLikes(vm.userId, reviewId)
                .then(function() {
                    findAllLikesForUser();
                }, function() {
                    vm.error = "Unable to remove the liked review"
                })
        }


    }
})();
