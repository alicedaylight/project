(function() {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/user/templates/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/makeup/search/new", {
                templateUrl: "views/makeup/templates/makeup-new.view.client.html",
                controller: "MakeupController",
                controllerAs: "model"
            })

                

            // .when("/makeup/search/new",)

            .when("/makeup/search", {
                templateUrl: "views/makeup/templates/makeup-search.view.client.html",
                controller: "MakeupSearchController",
                controllerAs: "model"
            })


            .when("/makeup/brand/:brand/type/:type/:productId", {
                templateUrl: "views/makeup/templates/makeup-product.view.client.html",
                controller: "MakeupProductController",
                controllerAs: "model"
            })

            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
                // remove ng-controller from the div inside of the login.template
                // we are telling the view who it's controller is instead of having
                // the view choose it's controller
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
                // internally you are going to refer to this controller as the variable
                // "model"
            })
            .when("/profile", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    // my own function goes out to server is user logged in?
                    // no: reject, yes: resolve go through
                    currentUser : checkLoggedIn
                }
            })

            .when("/profile/:username", {
                templateUrl: "views/user/templates/profile.public.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    // my own function goes out to server is user logged in?
                    // no: reject, yes: resolve go through
                    currentUser : checkLoggedIn
                }
            })


            .when("/website", { //4
                templateUrl: "views/website/templates/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model",
                resolve: {
                    currentUser : checkLoggedIn
                }
            })
            .when("/website/new", {
                templateUrl:"views/website/templates/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model",
                resolve: {
                    currentUser : checkLoggedIn
                }

            })
            .when("/website/:wid", {
                templateUrl: "views/website/templates/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model",
                resolve: {
                    currentUser : checkLoggedIn
                }
            })
            // .when("/website/:wid/page", {
            //     templateUrl: "views/page/templates/page-list.view.client.html",
            //     controller: "PageListController",
            //     controllerAs: "model",
            //     resolve: {
            //         currentUser : checkLoggedIn
            //     }
            // })
            // .when("/website/:wid/page/new", {
            //     templateUrl: "views/page/templates/page-new.view.client.html",
            //     controller: "NewPageController",
            //     controllerAs: "model",
            //     resolve: {
            //         currentUser : checkLoggedIn
            //     }
            // })
            // .when("/website/:wid/page/:pid", {
            //     templateUrl: "views/page/templates/page-edit.view.client.html",
            //     controller: "EditPageController",
            //     controllerAs: "model",
            //     resolve: {
            //         currentUser : checkLoggedIn
            //     }
            // })
            // see all of the widgets from a certain page of a certain user
            .when("/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/templates/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model",
                resolve: {
                    currentUser : checkLoggedIn
                }
            })

            // #!/website/{{model.wid}}/page/{{model.pid}}/widget/create/IMAGE
            .when("/image/new", {
                templateUrl: "views/widget/templates/widget-image-new.view.client.html",

                // templateUrl: "views/widget/templates/widget-chooser.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model",
                resolve: {
                    currentUser : checkLoggedIn
                }
            })

            .when('/image/create/:wtype', {
                templateUrl : "views/widget/templates/widget-new.view.client.html",
                controller: "CreateWidgetController",
                controllerAs: "model",
                resolve: {
                    currentUser : checkLoggedIn
                }
            })


            .when("/image/edit", {
                templateUrl: "views/widget/templates/widget-image-edit.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model",
                resolve: {
                    currentUser : checkLoggedIn
                }
            })
            // .when("/website/:wid/page/:pid/widget/new", {
            //     templateUrl: "views/widget/templates/widget-chooser.view.client.html",
            //     controller: "NewWidgetController",
            //     controllerAs: "model",
            //     resolve: {
            //         currentUser : checkLoggedIn
            //     }
            // })
            //
            // .when('/website/:wid/page/:pid/widget/create/:wtype', {
            //     templateUrl : "views/widget/templates/widget-new.view.client.html",
            //     controller: "CreateWidgetController",
            //     controllerAs: "model",
            //     resolve: {
            //         currentUser : checkLoggedIn
            //     }
            // })
            //
            //
            // .when("/website/:wid/page/:pid/widget/:wgid", {
            //     templateUrl: "views/widget/templates/widget-edit.view.client.html",
            //     controller: "EditWidgetController",
            //     controllerAs: "model",
            //     resolve: {
            //         currentUser : checkLoggedIn
            //     }
            // })

            .otherwise({
                redirectTo : "/home"

            });
    }


    function checkLoggedIn(UserService, $q, $location) {
        var deferred = $q.defer();
        console.log('checkLoggedIn')
        UserService
            .loggedIn()
            .then(function (user) {
                deferred.resolve(user);
                console.log('checkLoggedIn success')

            }, function() {
                deferred.reject();
                $location.url('/login');
            });
        return deferred.promise;
    }


    function checkCurrentUser(userService, $q) {
        var deferred = $q.defer(); // defer wrong
        userService
            .loggedIn()
            .then(function(user){
                if(user === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    // var adminLoggedIn
    //write another api ./api/adminLoggedIn
})();



// new widget controller controls chooser widget