'use strict';

/**
 * @description
 * Network related configurations and HTTP custom interceptor
 * @observations
 * 
 */

angular.module('dashboardApp')
	.config(networkConfig)
	.factory('HttpInterceptor', HttpInterceptor);

networkConfig.$inject = ['$httpProvider'];

HttpInterceptor.$inject = ['$q', 'networkConstants'];


function networkConfig($httpProvider) {
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }    
    // Disables IE AJAX request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

    $httpProvider.interceptors.push('HttpInterceptor');
}


function HttpInterceptor($q, networkConstants){
	return {
		request: function(config){
			// Sets a request timeout if there's not one
            if(!angular.isDefined(config.timeout)) {
                config.timeout = networkConstants.requestTimeout;
            }

            if(config.url.indexOf(networkConstants.apiUrl) !== -1) {
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