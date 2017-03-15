'use strict';

/**
 * @description
 * Router configuration
 * @observations
 * Separated from the main configuration file in order to be a more readable way of listing and configuring new routes.
 */

angular
    .module('dashboardApp')
    .config(routeConfig);

function routeConfig($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'vm'
        }
    );
}