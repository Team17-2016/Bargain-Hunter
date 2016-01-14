(function () {
    'use strict';

    angular.module('bargainHunterApp.controllers')
        .controller('MainController', ['$window', 'dataService', MainController]);

    function MainController($window, dataService) {
        var mc = this;

        mc.logout = function () {
            dataService.post('/users/logout')
                .finally(function () {
                    $window.location.href = '/';
                });
        }
    }
}());