(function() {
    angular
        .module("WebAppMaker")
        // .controller("MakeupListController", MakeupListController)
        .controller("MakeupSearchController", MakeupSearchController)
        .controller("MakeupProductController", MakeupProductController);

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

    function MakeupProductController(MakeupService, ReviewService, $routeParams, $location) {
        var brand = $routeParams.brand;
        var type = $routeParams.type;
        var productId = $routeParams.productId;


        var vm = this;
        vm.createReviewForUser = createReviewForUser;
        vm.createReviewForMakeup = createReviewForMakeup;

        init();

        function init() {
            MakeupService
                .findByIdBrandType(productId, brand, type)
                .then(function (makeup) {
                    console.log('makeup', makeup);
                    vm.makeup = makeup;
                });
        }


        // eventually adds the review to the array of reviews inside of users
        function createReviewForUser(description, brand, type, productId, name, score) {
            if (description === undefined || description === null || description === "") {
                vm.error = "Description cannot be empty.";
                return;
            } else {
                var newReview = {
                    desc: description,
                    brand : brand,
                    type : type,
                    name : name,
                    score : score
                    // productId : productId
                };
                return ReviewService
                    .createReviewForUser(newReview)
                    .then(function(){
                        $location.url("#!/profile/#portfolio");
                    });
            }
        }

        // eventually adds the review to the array of reviews inside of makeup
        function createReviewForMakeup(description, brand, type, productId) {
            if (description === undefined || description === null || description === "") {
                vm.error = "Description cannot be empty.";
                return;
            } else {
                var newReview = {
                    desc: description,
                    brand : brand,
                    type : type,
                    name : name,
                    score : score
                    // productId : productId
                };
                return MakeupService
                    .createReviewForMakeup(newReview)
                    .then(function(){
                        $location.url("#!/profile/#portfolio");
                    });
            }

        }

    }

    function MakeupSearchController($routeParams, MakeupService, $location) {
        var vm = this;
        vm.search = search;

        function search(brand, type) {
            var makeupPromise;

            if (!brand && !type)  {
                vm.error = "search fields cannot be empty.";
                return;
            }
            if (brand && type) {
                makeupPromise = MakeupService
                    .searchByBrandType(brand, type);
            } else if (!brand) {
                makeupPromise = MakeupService
                    .searchByType(type);
            } else { // (!type) {
                makeupPromise = MakeupService
                    .searchByBrand(brand);
            }
            makeupPromise.then(function(makeups) {
                vm.makeups = makeups;
            });
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