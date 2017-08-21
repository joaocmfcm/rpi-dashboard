(function(){
	'use strict';

	/**
	 * @description
	 * Dashboard main controller
	 * @observations
	 * 
	 */

	angular
		.module('dashboardApp')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = [];

	function DashboardController(){
		/* jshint validthis: true */
		var vm = this;
	}
})();