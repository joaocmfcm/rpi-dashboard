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
    			if(result.data){
    				if(result.data.os){
    					vm.os = result.data.os;
    				}
    				if(result.data.hardware){
    					vm.hardware = result.data.hardware;
    				}
    			}
    		}, function(error){
    			// TODO: show error
    		});
    	}
    }
})();