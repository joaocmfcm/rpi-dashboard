(function() {
    'use strict';

    /**
     * @description
     * Component that displays a card with the HDD information
     * @observations
     * 
     */

    angular
        .module('dashboardApp')
        .component('hddCard', {
            controller: Controller,
            templateUrl: '/views/components/_hdd-card.html',
            controllerAs: 'vm'
        });

    Controller.$inject = ['RestApiService', '$timeout', '$element', '$scope'];

    function Controller(RestApiService, $timeout, $element, $scope){
    	var vm = this;

        // Toggle to determine if the card should remotely update its data
        vm.updateCard = true;

        // Chart configuration
        vm.chartConfig = {
            
        };
    	
        // Watches the toggle to switch the data fetching for this card
        $scope.$watch('vm.updateCard', function(current, original) {
            if(current){
                _getHddInfo();
            }
        });

        // Fetches HDD information from server
    	function _getHddInfo(){
    		RestApiService.hdd.$get().then(function(result){
    			if(result.data){
                    
    			}
    		}, function(error){
    			// TODO: show error
    		});
    	};
    }

})();