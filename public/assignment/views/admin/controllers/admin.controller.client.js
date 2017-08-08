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
        vm.createUser = createUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;


        function init() {
            findAllUsers()
        }
        init();

        function updateUser(user) {
            UserService
                .updateUser(user._id, user)
                .then(findAllUsers);
        }

        function selectUser(user) {
            vm.user = angular.copy(user);
        }

        function createUser(user) {
            UserService
                .createUser(user)
                .then(findAllUsers);
        }

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