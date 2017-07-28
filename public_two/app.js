/**
 * Created by xoxoumop3pisdn on 6/2/17.
 */
(function () {
    angular
        .module("CoursesApp", ["ngRoute"]);
}) ();

// like main.js
// place to declare an app and decencies  nothing else

// (function () {
//     angular
//         .module("CoursesApp", [])
//         .controller("myController", function($scope) {
//             console.log("print from my controller");
//         });
//
// }) ();

// immediate function
// () () ;

// $routeProvider provided by ng-route so config can reference $routeProvider
// (function () {
//     angular
//         .module("CoursesApp", [])
//         .controller("myController", myCtrl);
//
//     // scope is provided by angular js.. it just means page.. scope
//     // page scope.. where you defined your controller is your scope
//     //$rootScope is a global... different layers of scope
//     function myCtrl($scope) {
//         $scope.test = "hello world";
//         // console.log("input value: " +$scope.test_two);
//
//         // print me is an immediate function delcaration
//         $scope.PrintMe =    function () {
//             console.log("input value: " +$scope.test_two);
//
//
//             // $scope.PrintMe = PrintValue;
//             //
//             // function PrintValue() {
//             //     console.log("input value: " +$scope.test_two);
//             // }
//         }
//
//     }
//
//
// }) ();

// $scope
// $rootScope
// $routeProvider
// $routeParameter
// $apply
// all provided by angular js

// 2 ways to define a variable .constructor. 1 from html defined ng-model "test_two", then this test_two is a variable/data
// and you can controller this variable by calling $scope to reach out to this variable. $scope is provided by anulgar js..
//     the scope represents the view of your controller .. define ng-controller...
//     controller is defined to control a part of your view... can be entire html view or a part of a html.. depending
// on which part you link your controller to <body ng-controller> </body>
// angular matches the name to determine which controller
// ng-click is a keyword
// usually one page one controller, normally put controller on body and control the whole page














