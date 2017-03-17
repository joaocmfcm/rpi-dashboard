(function(){
	'use strict';

	/**
	 * @description
	 * Network related configurations and HTTP custom interceptor
	 * @observations
	 * 
	 */

	angular
		.module('dashboardApp')
		.config(networkConfig)
		.factory('HttpInterceptor', HttpInterceptor);

	networkConfig.$inject = ['$httpProvider'];

	HttpInterceptor.$inject = ['$q', 'networkConstants', 'LogsService'];


	function networkConfig($httpProvider) {
	    if (!$httpProvider.defaults.headers.get) {
	        $httpProvider.defaults.headers.get = {};    
	    }    

	    $httpProvider.interceptors.push('HttpInterceptor');
	}


	function HttpInterceptor($q, networkConstants, LogsService){
		return {
			request: function(config){
				// Sets a request timeout if there's not one
	            if(!angular.isDefined(config.timeout)){
	                config.timeout = networkConstants.requestTimeout;
	            }

	            if(config.url.indexOf(networkConstants.apiUrl) !== -1){
	            	LogsService.logDebug(config.method + ' - ' + config.url ,'HttpInterceptor');
	                if(!angular.isDefined(config.params)) {
	                    config.params = {};
	                }
	            }

	            if(config.method && config.method === 'GET'){
	                if(config.params){
	                    config.params.timestamp = new Date().getTime();
	                }
	            }

	            return config;
			},

			responseError: function(response){
				return $q.reject(response);
			},

			response: function(response){
	            return response;
	        }	
		};
	}
})();