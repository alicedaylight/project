(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService, currentUser) {
        var vm = this;

        // vm.uid = $routeParams.uid;
        // vm.wid = $routeParams.wid;
        // vm.pid = $routeParams.pid;
        vm.uid = currentUser._id;


            WebsiteService
                .findWebsitesByUser(vm.uid)
                .then(renderWebsites);

            function renderWebsites(websites) {
                vm.websites = websites;
            }
    }

    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.newWebsite = newWebsite;

        function newWebsite(name, description) {
                        var newWebsite = {
                            name: name,
                            desc: description

                        };
                        return WebsiteService
                            .createWebsite(vm.uid, newWebsite)
                            .then (function (website) {
                    $location.url("/user/" + vm.uid + "/website");
                });
        }
    }

    function EditWebsiteController($routeParams, WebsiteService, $location, currentUser) {
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
            WebsiteService
                .updateWebsite(website._id, website)

                .then(function(website) {
                    $location.url("/user/" + vm.uid + "/website");
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






















