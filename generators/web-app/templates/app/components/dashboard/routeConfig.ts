/// <reference path="../../../typings/angularjs/angular-route.d.ts"/>

'use strict'

angular.module('<%= angularModule %>.dashboard').config(function ($routeProvider:angular.route.IRouteProvider) {
    $routeProvider.when('/dashboard', {
        templateUrl: '/components/dashboard/dashboard.html',
        controller: Preporg.Dashboard.DashboardController,
        controllerAs: 'dashboard'
    });
});
