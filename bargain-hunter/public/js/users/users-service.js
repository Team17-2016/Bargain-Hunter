(function () {
    'use strict';

    angular.module('bargainHunterApp.services')
        .factory('usersService', ['dataService', usersService]);

    function usersService(dataService) {
        function getUserByName(name) {
            return dataService.get('/users?name=' + name);
        }

        return {
            getUserByName: getUserByName
        }
    }
}());