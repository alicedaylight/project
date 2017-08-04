(function () {
    angular
        .module("WebAppMaker")
        .factory('WebsiteService', WebsiteService);

    function WebsiteService($http) {

        var websites = [
            {_id: "123", name: "Facebook", developerId: "456", desc: "Test01"},
            {_id: "234", name: "Tweeter", developerId: "456", desc: "Test02"},
            {_id: "456", name: "Gizmodo", developerId: "456", desc: "Test03"},
            {_id: "567", name: "Tic Tac Toe", developerId: "123", desc: "Test04"},
            {_id: "678", name: "Checkers", developerId: "123", desc: "Test05"},
            {_id: "789", name: "Chess", developerId: "234", desc: "Test06"}
        ];


        // API here and implementing the function below
        var services = {
            'createWebsite': createWebsite,
            'findWebsitesByUser': findWebsitesByUser,
            'findWebsiteById': findWebsiteById,
            'updateWebsite': updateWebsite,
            'deleteWebsite': deleteWebsite,
            'deleteWebsitesByUser': deleteWebsitesByUser,
            'deleteWebsiteFromUser': deleteWebsiteFromUser
        };
        return services;

        // function getNextId() {
        //     function getMaxId(maxId, currentId) {
        //         var current = parseInt(currentId._id);
        //         if (maxId > current) {
        //             return maxId;
        //         } else {
        //             return current + 1;
        //         }
        //     }
        //     return websites.reduce(getMaxId, 0).toString();
        // }


        function createWebsite(userId, website) {
            var url = "/api/user/" +userId + "/website";
            //     // create new instance using post()
            //     // post(urlWhereSendingData,actualDataEncodedInBody)
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        // same as jose's findAllWebsitesForUser
        function findWebsitesByUser(userId) {
            var url = "/api/user/" +userId +"/website";

            return $http.get(url)
                //unwrap response
                .then(function (response) {
                    // return as embedded response
                    return response.data;
                });

        }


        // finds the website by ID
        // do I still need to refactor this function since it is not calling any methods
        // inside of the services
        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;

            return $http.get(url)
                .then(function(response) {
                    console.log(response);
                    return response.data;
                });
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/website/" +websiteId;

            return $http.put(url, website)
                .then(function(response) {
                    return response.data;
                });
        }


        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url)
                .then(function(response) {
                    return response.data;
                });
        }


        function deleteWebsiteFromUser(userId, websiteId) {
            var url = "/api/user/" + userId + "/website/" + websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsitesByUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }


    }
})();