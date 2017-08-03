(function() {
    angular
        .module("WebAppMaker")
        // .controller("MakeupListController", MakeupListController)
        .controller("MakeupSearchController", MakeupSearchController)
        // .controller("EditMakeupController", EditMakeupController);

    function MakeupListController($routeParams, MakeupService, currentUser) {
        var vm = this;

        vm.uid = currentUser._id;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        MakeupService
            .findAllMakeupsForWebsite(vm.wid)
            .then(renderMakeups);

        function renderMakeups(makeups) {
            vm.makeups = makeups;

        }
    }


    function MakeupSearchController($routeParams, MakeupService, $location) {
        // console.log("inside makeupsearch")
        var vm = this;
        vm.search = search;

        function search(brand, type) {

            // if ((brand === undefined || brand === null || brand === "") &&
            //     (type === undefined || type === null || type === "") )  {
            //     vm.error = "search fields cannot be empty.";
            //     return;
            // }

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

            MakeupService
                .searchByBrandType(brand, type)
                .then(function(makeups) {
                    vm.makeups = makeups;
                });


            console.log("brand" + brand);

        }

    }


    function EditMakeupController($routeParams, MakeupService, $location, $timeout, currentUser) {
        var vm = this;
        vm.uid = currentUser._id;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        vm.updateMakeup = updateMakeup;
        vm.deleteMakeup = deleteMakeup;

        vm.makeup = MakeupService.findMakeupById(vm.pid);

        MakeupService
            .findMakeupById(vm.pid)
            .then(renderMakeup, makeupError);

        function renderMakeup(makeup) {
            vm.makeup = makeup;
        }

        function makeupError(error) {
            vm.error = "Makeup not found";
        }

        function updateMakeup(makeup) {
            if(makeup.name === null || makeup.name === undefined || makeup.name === ""){
                vm.error = "Makeup name cannot be empty";
                $timeout(function(){
                    vm.error = null;
                }, 3500);
                return;
            }

            MakeupService
                .updateMakeup(makeup._id, makeup)
                .then(function() {
                    $location.url("/website/" + vm.wid + "/makeup/");
                    vm.updated = "Makeup update was successful";
                    $timeout(function() {
                        vm.updated = null;
                    }, 3000);

                });
        }

        function deleteMakeup(makeupId) {
            MakeupService
                .deleteMakeupFromWebsite(vm.wid, vm.pid)
                .then(function() {
                    $location.url("/website/" + vm.wid + "/makeup");
                }, function() {
                    vm.error = "Unable to delete makeup";
                });
        }

    }


})();