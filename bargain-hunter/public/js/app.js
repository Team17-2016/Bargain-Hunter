(function () {
    'use strict';

    angular.module('bargainHunterApp.services', []);
    angular.module('bargainHunterApp.controllers', ['bargainHunterApp.services']);
    angular.module('bargainHunterApp', ['bargainHunterApp.controllers'])
}());