(function(){
	'use strict';

	/**
	 * @description
	 * Component to render and control the sidebar
	 * @observations
	 * 
	 */

	angular.module('dashboardApp')
		.component('sidebar', {
            bindings: {

            },
            templateUrl: '/views/components/_sidebar.html',
            controller: Controller,
            controllerAs: 'vm'
		});

	Controller.$inject = [];

	function Controller(){
		var vm = this;

		vm.title = 'hello text';
	}
})();


