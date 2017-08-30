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

    Controller.$inject = ['RestApiService', '$timeout', '$element', 'colors', '$scope', 'splineConfig'];

    function Controller(RestApiService, $timeout, $element, colors, $scope, splineConfig){
    	var vm = this;

        // Toggle to determine if the card should remotely update its data
        vm.updateCard = true;

        // Chart configuration
        vm.chartConfig = {
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    format: '{value}'
                },
                visible: false,
            },
            navigator: {
                enabled: true,
                series: {
                    color: colors.dashboard_purple,
                    lineWidth: 1
                }
            }
        };

        angular.extend(vm.chartConfig, splineConfig);
    	
        // Watches the toggle to switch the data fetching for this card
        $scope.$watch('vm.updateCard', function(current, original) {
            if(current){
                _getCPUInfo();
            }
        });

        // Fetches CPU information from server
    	function _getCPUInfo(){
    		RestApiService.cpu.$get().then(function(result){
    			if(result.data){
                    var now = new Date();
    				vm.cpuInfo = result.data.info;
                    vm.cpuInfo.speed = result.data.speed;
                    _getCPUReadings();
    			}
    		}, function(error){
    			// TODO: show error
    		});
    	};

        // Fetches the CPU readings stored in the server
        function _getCPUReadings(){
            RestApiService.cpu.readings.$get().then(function(result){
                if(result.data){
                    var processedCPUReadings = _processCPUReadings(result.data);
                    
                    vm.chartConfig.series = [
                        {id:'cpuload', data: processedCPUReadings.load, color: colors.dashboard_purple, name: 'CPU (%)', showInLegend: false}, 
                        {id:'temp', color: colors.dashboard_blue, data: processedCPUReadings.temp, name: 'Temperature (Cº)', showInLegend: false}
                    ];
                    
                    vm.chartConfig.xAxis.min = moment().subtract(1, 'minutes').valueOf();
                    vm.chartConfig.xAxis.max = moment().valueOf();
                    
                    vm.lastTemp = processedCPUReadings.temp[processedCPUReadings.temp.length-1][1];
                    vm.lastLoad = processedCPUReadings.load[processedCPUReadings.load.length-1][1];

                    vm.chartConfig.chart.width = angular.element("#cpu-chart")[0].offsetWidth-30;

                    $timeout(function(){
                        if(vm.updateCard) _getCPUReadings();  
                    }, 5000);
                }
            }, function(error){
                // TODO: show error
            });
        };

        // Processes the array of readings to retrieve formatted information to populate the charts
        function _processCPUReadings(data){
            var cpuLoadValues = [];
            var cpuTempValues = [];
            data.forEach(function(entry){
                cpuLoadValues.push([moment(entry.createdAt).valueOf(), Number(entry.load.toFixed(1))]);
                cpuTempValues.push([moment(entry.createdAt).valueOf(), Number(entry.temp.toFixed(1))]);
            });

            return {load: cpuLoadValues, temp: cpuTempValues};
        }
    }

})();