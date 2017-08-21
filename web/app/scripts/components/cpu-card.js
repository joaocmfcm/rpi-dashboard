(function() {
    'use strict';

    /**
     * @description
     * Component that displays a card with the cpu information
     * @observations
     * 
     */

    angular
        .module('dashboardApp')
        .component('cpuCard', {
            controller: Controller,
            templateUrl: '/views/components/_cpu-card.html',
            controllerAs: 'vm'
        });

    Controller.$inject = ['RestApiService', '$timeout'];

    function Controller(RestApiService, $timeout) {
    	var vm = this;

        vm.temperature = [];
        vm.load = [];

    	_getData();

    	function _getData(){
    		RestApiService.cpu.$get().then(function(result){
    			if(result.data){
                    var now = new Date();
    				vm.cpuInfo = result.data.info;
                    vm.cpuInfo.speed = result.data.speed;
                    /*vm.temperature.push = {timestamp: now, val: result.data.temperature.main ? result.data.temperature.main : 0};
                    vm.load.push = {timestamp: now, val: result.data.load.currentLoad ? result.data.load.currentLoad : 0};

                    $timeout(function(){
                        _getData();
                    }, 5000);*/
    			}
    		}, function(error){
    			// TODO: show error
    		});
    	}
    }
})();