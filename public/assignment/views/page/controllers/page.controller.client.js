(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService, currentUser) {
        var vm = this;

        vm.uid = currentUser._id;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        PageService
            .findAllPagesForWebsite(vm.wid)
            .then(renderPages);

        function renderPages(pages) {
            vm.pages = pages;

        }
    }


    function NewPageController($routeParams, PageService, $location, currentUser) {
        var vm = this;
        vm.uid = currentUser._id;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.newPage = newPage;

        init();

        // need to update the page-new-view to add a ng-repeat for page in model.pages
        function init() {
            PageService
                .findAllPagesForWebsite(vm.wid)
                .then(function(pages) {
                    vm.pages = pages;
                });
        }

        function newPage(name, description) {
            if(name === null || name === undefined || name === " ") {
                vm.error = "Page name cannot be empty";
                // $timeout(function() {
                //     vm.error = null;
                // }, 3500);
                return;
            }
            var newPage = {
                name: name,
                description : description
            };
            PageService
                .createPage(vm.wid, newPage)
                .then(function (page) {
                    $location.url("/website/" + vm.wid + "/page");
                });
        }
    }


    function EditPageController($routeParams, PageService, $location, $timeout, currentUser) {
        var vm = this;
        vm.uid = currentUser._id;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        vm.page = PageService.findPageById(vm.pid);

        PageService
            .findPageById(vm.pid)
            .then(renderPage, pageError);

        function renderPage(page) {
            vm.page = page;
        }

        function pageError(error) {
            vm.error = "Page not found";
        }

        function updatePage(page) {
            if(page.name === null || page.name === undefined || page.name === ""){
                vm.error = "Page name cannot be empty";
                $timeout(function(){
                    vm.error = null;
                }, 3500);
                return;
            }

            PageService
                .updatePage(page._id, page)
                .then(function() {
                    $location.url("/website/" + vm.wid + "/page/");
                    vm.updated = "Page update was successful";
                    $timeout(function() {
                        vm.updated = null;
                    }, 3000);

                });
        }

        function deletePage(pageId) {
            PageService
                .deletePageFromWebsite(vm.wid, vm.pid)
                .then(function() {
                    $location.url("/website/" + vm.wid + "/page");
                }, function() {
                    vm.error = "Unable to delete page";
                });
        }

    }


})();