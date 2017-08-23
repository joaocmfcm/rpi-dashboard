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
		.constant('colors', {dashboard_red: 'rgb(202,53,78)',	
								dashboard_green: 'rgb(51,219,140)',
								dashboard_purple: 'rgb(119,58,247)',
								dashboard_blue: 'rgba(65,90,254,1.0)',
								dashboard_light_blue: 'rgba(94,131,255,1)',
								dashboard_turquoise: 'rgba(49,173,186,1)',
								dashboard_pink: 'rgb(228,23,102)',
								dashboard_orange: 'rgb(253,100,105)'});
})();
