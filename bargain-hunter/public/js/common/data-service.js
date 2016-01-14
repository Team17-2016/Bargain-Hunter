(function () {
    'use strict';

    angular.module('bargainHunterApp.services')
        .factory('dataService', ['$http', '$q', dataService]);

    function dataService($http, $q) {

        function get(url, params) {
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

        function post(url, data) {
            var deferred = $q.defer();

            $http
                .post(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function put(url, data) {
            var deferred = $q.defer();

            $http
                .put(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function deleteRequest(url) {
            var deferred = $q.defer();

            $http
                .delete(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        return {
            get: get,
            post: post,
            put: put,
            deleteRequest: deleteRequest
        }
    }
}());