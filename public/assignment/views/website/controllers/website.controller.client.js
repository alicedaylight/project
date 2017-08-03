(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController(WebsiteService, currentUser) {
        var vm = this;

        vm.uid = currentUser._id;


            WebsiteService
                .findWebsitesByUser(vm.uid)
                .then(renderWebsites);

            function renderWebsites(websites) {
                vm.websites = websites;
            }
    }

    function NewWebsiteController(WebsiteService, $location, currentUser) {
        var vm = this;
        vm.search = search;

        function search(brand, type) {
            //     if (brand === undefined || brand === null || brand === "") {
            //         vm.error = "Brand cannot be empty.";
            //         return;
            //     }

            //     if (type === undefined || type === null || type === "") {
            //         vm.error = "Type cannot be empty.";
            //         return;
            //     }


            MakeupService
                .searchByBrand(brand)
                .then(function(makeups) {
                    vm.makeups = makeups;
                });

            MakeupService
                .searchByType(type)
                .then(function(makeups) {
                    vm.makeups = makeups;
                });

            MakeupSearvice
                .searchByBrandType(brand, type)
                .then(function(makeups) {
                    vm.makeups = makeups;
                });


            console.log("brand" + brand);

        }


        // to load left side of the view
        WebsiteService
            .findWebsitesByUser(vm.uid)
            .then(renderWebsites);

        function renderWebsites(websites) {
            vm.websites = websites;
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

        // WebsiteService
        //     .findWebsitesByUser(vm.uid)
        //     .then(renderWebsites);
        //
        // function renderWebsites(websites) {
        //     vm.websites = websites;
        // }
    }

})();






















