(function() {
    'use strict';

    /**
     * @description
     * Service that communicates directly with the REST API
     * @observations
     * 
     */

    angular
        .module('dashboardApp')
        .factory('RestApiService', factory);

    factory.$inject = ['$http', 'networkConstants'];

    function factory($http, networkConstants) {
        var system = {
    		$get: function(){
    			return $http({method: 'GET', url: networkConstants.apiUrl + 'system'});
    		}
        }

        var api = {
            system: system
        };

        return api;       
    }
})();