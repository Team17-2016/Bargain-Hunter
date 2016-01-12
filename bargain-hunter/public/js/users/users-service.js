(function () {
    'use strict';

    angular.module('bargainHunterApp.services')
        .factory('usersService', ['$http', '$q', usersService]);

    function usersService($http, $q) {
        function getUserByName(url, params) {
            var deferred = $q.defer();

            $http
                .get(url, {
                    params: params
                })
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        return {
            getUserByName: getUserByName
        }
    }
}());