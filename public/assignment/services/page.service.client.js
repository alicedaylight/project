(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        var services = {
            "createPage"   : createPage,
            "findAllPagesForWebsite" : findAllPagesForWebsite,
            "findPageById" : findPageById,
            "updatePage" : updatePage,
            "deletePage" : deletePage,
            "deletePageFromWebsite": deletePageFromWebsite,
            "deletePagesByWebsite" : deletePagesByWebsite,
            "searchByBrand" : searchByBrand,
            "searchByType" : searchByType
            // "searchByTag" : searchByTag
        };

        return services;

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



        function createPage(websiteId, page) {
            var url = "/api/website/" +websiteId + "/page";
            return $http.post(url, page)
                .then(function(response) {
                    return response.data;
                });
        }


        function findAllPagesForWebsite(websiteId) {
            var url = '/api/website/' +websiteId + '/page';
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });

        }


        function findPageById(pageId) {
            var url = '/api/page/' +pageId;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }


        function updatePage(pageId, page) {
            var url = '/api/page/' +pageId;
            return $http.put(url, page)
                .then(function(response) {
                    return response.data;
                });

        }


        function deletePage(pageId) {
            var url = '/api/page/' +pageId;
            return $http.delete(url)
                .then(function(response) {
                    return response.data;
                })
        }

        function deletePageFromWebsite(websiteId, pageId) {
            var url = "/api/website/" + websiteId + "/page/" + pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePagesByWebsite(websiteId){
            var url = "/api/website/" + websiteId + "/page";
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();

