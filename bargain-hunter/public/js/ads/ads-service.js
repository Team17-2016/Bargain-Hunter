(function () {
    'use strict';

    angular.module('bargainHunterApp.services')
        .factory('adsService', ['$http', '$q', adsService]);

    function adsService($http, $q) {
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