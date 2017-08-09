(function() {
    angular
        .module("WebAppMaker")
        .factory("MakeupService", MakeupService);

    function MakeupService($http) {

        var services = {
            "createMakeup"   : createMakeup,
            "findAllMakeupsForWebsite" : findAllMakeupsForWebsite,
            "findMakeupById" : findMakeupById,
            "updateMakeup" : updateMakeup,
            "deleteMakeup" : deleteMakeup,
            "deleteMakeupFromWebsite": deleteMakeupFromWebsite,
            "deleteMakeupsByWebsite" : deleteMakeupsByWebsite,
            "searchByBrand" : searchByBrand,
            "searchByType" : searchByType,
            "searchByBrandType" : searchByBrandType,
            "findByIdBrandType" : findByIdBrandType,

            // need below
            "createReviewForMakeup" : createReviewForMakeup
        };

        return services;

        function createReviewForMakeup(review) {
            var url = "/api/reviews/makeup";

            return $http.post(url, review)
                .then(function(response) {
                    console.log(response);
                    return response.data;
                });
        }


        function findByIdBrandType(id, brand, type) {
            return searchByBrandType(brand, type)
                .then(function(makeups) {
                    var foundMakeup = null;
                    makeups.forEach(function (makeup) {
                        if (makeup.id == id) {
                            foundMakeup = makeup;
                        }
                    });
                    return foundMakeup;
                });
        }

        function searchByBrand(brand) {
            // var url = "/api/makeupSearchBrand";
            var url =  "http://makeup-api.herokuapp.com/api/v1/products.json?brand=" + brand;

            return $http.get(url, brand)
            // "http://makeup-api.herokuapp.com/api/v1/products.json?brand=" + brand
                .then(function(response) {
                    console.log(response);
                    return response.data;
                });
        }

        function searchByType(type) {
            var url =  "http://makeup-api.herokuapp.com/api/v1/products.json?product_type=" + type;

            return $http.get(url, type)
            // "http://makeup-api.herokuapp.com/api/v1/products.json?brand=" + brand
                .then(function(response) {
                    console.log(response);
                    return response.data;
                });
        }

        function searchByBrandType(brand, type) {
            var url = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=" + brand + "&product_type=" + type;
            return $http.get(url, type)
                .then(function(response) {
                    console.log(response);
                    return response.data;
                });
        }


        function createMakeup(websiteId, makeup) {
            var url = "/api/website/" +websiteId + "/makeup";
            return $http.post(url, makeup)
                .then(function(response) {
                    return response.data;
                });
        }


        function findAllMakeupsForWebsite(websiteId) {
            var url = '/api/website/' +websiteId + '/makeup';
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });

        }

        function findMakeupById(makeupId) {
            var url = '/api/makeup/' +makeupId;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }


        function updateMakeup(makeupId, makeup) {
            var url = '/api/makeup/' +makeupId;
            return $http.put(url, makeup)
                .then(function(response) {
                    return response.data;
                });

        }

        function deleteMakeup(makeupId) {
            var url = '/api/makeup/' +makeupId;
            return $http.delete(url)
                .then(function(response) {
                    return response.data;
                })
        }

        function deleteMakeupFromWebsite(websiteId, makeupId) {
            var url = "/api/website/" + websiteId + "/makeup/" + makeupId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteMakeupsByWebsite(websiteId){
            var url = "/api/website/" + websiteId + "/makeup";
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();

