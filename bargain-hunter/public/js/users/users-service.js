(function () {
    'use strict';

    angular.module('bargainHunterApp.services')
        .factory('usersService', ['dataService', usersService]);

    function usersService(dataService) {
        function getUserByName(url) {
            return dataService.get(url);
        }

        return {
            getUserByName: getUserByName
        }
    }
}());