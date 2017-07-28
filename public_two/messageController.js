/**
 * Created by xoxoumop3pisdn on 6/2/17.
 */
(function () {
    angular
        .module("CourseApp")
        .controller("message.controller", messageCtrl);

    function coursesListCtrl($scope) {
        console.log("load coursesListCtrl");

        var courses = [
            {title: "Java 101", seats: 12, start: new Date()},
            {title: "Node Js 101", seats: 12, start: new Date()},
            {title: "HTML 101", seats: 12, start: new Date()},
            {title: "CSS 101", seats: 12, start: new Date()},

        ];

        $scope.courses = courses;
    }
}) ();
