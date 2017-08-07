(function() {
    angular
        .module("WebAppMaker")
        .controller("AdminController", AdminController)
        .controller("AdminUsersController", AdminUsersController);

    function AdminController() {

    }

    function AdminUsersController(UserService) {
        var vm = this;
        vm.deleteUser = deleteUser;

        function init() {
            findAllUsers()
        }
        init();

        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(findAllUsers);

        }

        function findAllUsers() {
            UserService
                .findAllUsers()
                .then(function(users) {
                    vm.users = users;
                });
        }


    }

})();