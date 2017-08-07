(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService', UserService);

    function UserService($http) {

        var services = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "login" : login,
            "loggedIn" : loggedIn,
            "logout" : logout,
            "register" : register,
            "checkAdmin" : checkAdmin,
            "findAllUsers" : findAllUsers,
            "unregister" : unregister
        };
        return services;

        function unregister(userObj) {
            var url = "/api/user/register";
            return $http.post(url, userObj)
                .then(function(response) {
                    return response.data;
                });
        }

        function findAllUsers() {
            var url = "/api/user";
            return $http.get(url)
                .then (function (response) {
                    return response.data;
                });
        }

        function checkAdmin() {
            var url = "/api/user/checkAdmin";
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

        function register(userObj) {
            var url = "/api/user/register";
            return $http.post(url, userObj)
                .then(function(response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/user/logout";
            return $http.post(url)
                .then(function(response){
                    return response.data;
                });

        }

        function loggedIn() {
            var url = "/api/user/loggedin";
            return $http.get(url)
                .then(function(response){
                    // user object or null or 0 flag to tell us user is not there
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/user/login";
            // schema passport is expecting
            // json object with 2 attributes username and password
            var credentials = {
                username : username,
                password : password
            };
            return $http.post(url, credentials)
                .then(function(response){
                    return response.data;
                    // send response back to controller
                });
        }


        function createUser(user) {
            var url = "/api/user/";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
            });
        }


        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url)
                .then(function(response) {
                    var user = response.data;
                    return user;
                })
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url)
                .then (function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url)
                .then (function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/user/"+userId;
            // manipuating/changing/mutating something use put
            return $http.put(url, user)
                .then(function(response) {
                    return response.data;
                    // go out to server and server response and unwrap it here
                });
        }

        function deleteUser(userId) {
            var url = "/api/user/" +userId;
            return $http.delete(url)
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();