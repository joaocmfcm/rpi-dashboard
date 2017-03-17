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
            logInfo: _logInfo,
            logDebug: _logDebug
        };
        return api;

        function _logInfo(message, identifier) {
        	$log.info(identifier + ': ' + new Date() + ' - ' + message);
        }

        function _logDebug(message, identifier) {
        	$log.debug(identifier + ': ' + new Date() + ' - ' + message);
        }
    }
})();