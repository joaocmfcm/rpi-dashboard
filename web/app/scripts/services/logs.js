(function() {
    'use strict';

    /**
     * @description
     * Logging service wrapper
     * @observations
     * 
     */

    angular
        .module('dashboardApp')
        .factory('LogsService', factory);

    factory.$inject = ['$log'];

    function factory($log) {
        var api = {
            logInfo: _logInfo
        };
        return api;

        function _logInfo() {
        	$log.info('INFO: ' + new Date())
        }
    }
})();