/**
 * Created by xoxoumop3pisdn on 6/2/17.
 */
(function () {
    angular
        .module("CoursesApp")

        .config(function ($routeProvider) {
            $routeProvider
                // which part of the html that I should load
                .when("/",
                    {
                        templateUrl:"coursesList.view.html",
                        controller: "coursesList.controller"
                    })
                .when("/profile",
                    {
                        templateUrl: "profile.view.html",
                        controller: "profile.controller"
                    })
                .when("message",
                    {
                        templateUrl: "message.view.html",
                        controller: "message.controller"
                    })
        })
}) ();

// routeProvider tells you where you are.. what link are you at
// we judge. if you are at profiel.. we go to profile
