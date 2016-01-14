(function () {
    'use strict';

    angular.module('bargainHunterApp.controllers')
        .controller('AdminUsersEditController', ['$location', '$window', 'dataService', AdminUsersEditController]);

    function AdminUsersEditController($location, $window, dataService) {
        var vm = this;

        vm.promote = function () {
            var url = $location.absUrl();
            dataService.post(url)
                .then(function () {
                    $window.location.reload();
                });
        };

        vm.deleteUser = function () {
            var url = $location.absUrl();
            dataService.deleteRequest(url)
                .then(function () {
                    $window.location.href = $location.protocol() + "://" + $location.host() + ":" + $location.port() + '/admin/users';
                });
        }
    }
}());