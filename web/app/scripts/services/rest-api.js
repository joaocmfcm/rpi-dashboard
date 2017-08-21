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
        };

        var cpu = {
            $get: function(){
                return $http({method: 'GET', url: networkConstants.apiUrl + 'cpu'});
            }
        };

        var ram = {
            $get: function(){
                return $http({method: 'GET', url: networkConstants.apiUrl + 'ram'});
            }
        };

        var drives = {
            $get: function(){
                return $http({method: 'GET', url: networkConstants.apiUrl + 'drives'});
            }
        };

        var api = {
            system: system,
            cpu: cpu,
            ram: ram,
            drives: drives,
        };

        return api;       
    }
})();