(function () {
    'use strict';

    angular.module('bargainHunterApp.controllers')
        .controller('AdminUsersController', ['dataService', AdminUsersController]);

    function AdminUsersController(dataService) {
        var vm = this;
        
        vm.request = {
            orderBy: 'username',
            orderType: 'asc',
            page: 1,
            pageSize: 10
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
        };

        vm.updatePage = function (num) {
            if(num !== 1 && num !== -1) {
                return;
            }

            var nextPage = vm.request.page + num;
            if(nextPage < 1) {
                return;
            }

            vm.request.page = nextPage;
            vm.filter();
        };
    }
}());