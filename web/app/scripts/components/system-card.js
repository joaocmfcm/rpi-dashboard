(function() {
    'use strict';

    /**
     * @description
     * Component that displays a card with the system information
     * @observations
     * 
     */

    angular
        .module('dashboardApp')
        .component('systemCard', {
            controller: Controller,
            templateUrl: '/views/components/_system-card.html',
            controllerAs: 'vm'
        });

    Controller.$inject = ['RestApiService'];

    function Controller(RestApiService) {
    	var vm = this;

    	_getSystemInformation();
    	function _getSystemInformation(){
    		RestApiService.system.$get().then(function(result){
    			console.log(result);
    		}, function(error){

    		});
    	}
    }
})();