(function () {
    'use strict';

    angular.module('bargainHunterApp.controllers')
        .controller('AdsController', ['adsService', AdsController]);

    function AdsController(adsService) {
        var vm = this;

        vm.usernameExists = false;

        vm.checkIfUsernameExists = function () {
            usersService.getUserByName('/users?name=' + vm.user.username)
                .then(function (data) {
                    if (data.username) {
                        vm.usernameExists = true;
                    } else {
                        vm.usernameExists = false;
                    }
                }, function (err) {
                    vm.usernameExists = false;
                });
        }
    }
}());