(function () {
    'use strict';

    angular.module('bargainHunterApp.controllers')
        .controller('AdminUsersController', ['dataService', AdminUsersController]);

    function AdminUsersController(dataService) {
        var vm = this;
        
        vm.request = {
            orderBy: 'username',
            orderType: 'asc'
        };

        dataService.get('/admin/users/all', vm.request)
            .then(function (data) {
                vm.users = data;
            });

        vm.filter = function () {
            dataService.get('/admin/users/all', vm.request)
                .then(function (data) {
                    vm.users = data;
                });
        }
    }
}());