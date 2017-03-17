(function(){
	'use strict';

	/**
	 * @description
	 * Static constants used accross the app
	 * @observations
	 * 
	 */

	angular
		.module('dashboardApp')
		.constant('networkConstants', {apiUrl: 'http://localhost:3000/api/', requestTimeout: 30000});
})();
