(function() {
    angular
        .module("WebAppMaker")
        .controller("ReviewListController", ReviewListController)
        .controller("NewReviewController", NewReviewController)
        .controller("EditReviewController", EditReviewController);

    function ReviewListController(WebsiteService, currentUser) {
        var vm = this;

        vm.uid = currentUser._id;


        WebsiteService
            .findWebsitesByUser(vm.uid)
            .then(renderWebsites);

        function renderWebsites(websites) {
            vm.websites = websites;
        }
    }

    function NewReviewController(WebsiteService, $location, currentUser) {
        var vm = this;
        vm.uid = currentUser._id;
        // vm.wid = $routeParams.wid;
        // vm.pid = $routeParams.pid;
        vm.newWebsite = newWebsite;

        function newWebsite(name, description) {
            if (name === undefined || name === null || name === "") {
                vm.error = "Name cannot be empty.";
                return;
            }
            var newWebsite = {
                name: name,
                desc: description
            };
            return WebsiteService
                .createWebsite(vm.uid, newWebsite)
                .then (function (website) {
                    $location.url("/website");
                });
        }
    }

    function EditReviewController($routeParams, WebsiteService, $location, currentUser) {
        var vm = this;
        vm.uid = currentUser._id;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        // view is left hand
        // view model.pid
        // config is right side from routeParam

        //event handler that listens for an incoming click
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        // displays all of the websites on the lefthand side of the page (same as website-list)

        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);

        WebsiteService
            .findWebsiteById(vm.wid)
            .then(renderWebsite, websiteError);

        function renderWebsite(website) {
            vm.website = website;
        }

        function websiteError(error) {
            vm.error = "Website not found";
        }

        function updateWebsite(website) {
            if (website.name === undefined || website.name === null || website.name === "") {
                vm.error = "Name cannot be empty.";
                return;
            }
            WebsiteService
                .updateWebsite(website._id, website)

                .then(function(website) {
                    $location.url("/website");
                });

        }

        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsiteFromUser(vm.uid, vm.wid)
                .then(function() {
                    $location.url("/website");
                }, function () {
                    vm.error = "Unable to delete you";
                });
        }
    }



})();