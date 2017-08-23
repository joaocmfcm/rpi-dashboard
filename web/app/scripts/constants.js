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
		.constant('networkConstants', {apiUrl: 'http://localhost:3000/api/', requestTimeout: 30000})
		.constant('colors', {blue: 'rgba(65,90,254,1.0)', red: 'rgba(202,53,78,1)', pink: 'rgba(228,23,102,1)', green: 'rgba(51,219,140,1)'});
})();
