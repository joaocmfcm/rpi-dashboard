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

    Controller.$inject = ['RestApiService', '$timeout', '$element', 'colors'];

    function Controller(RestApiService, $timeout, $element, colors){
    	var vm = this;

        vm.temperature = [];
        vm.load = [];


        vm.cardColor = '';
        vm.chartConfig = {
            useHighStocks: true,
            chart: {
                type: 'spline',
                zoomType: 'x',
                backgroundColor: 'transparent',
                polar: true,
                spacingLeft: 0,
                spacingRight: 0,
                spacingBottom: 0,
                width: 100,
                height: 300,
                animation: false
            },
            xAxis: {
                type: 'datetime',
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    format: '{value}'
                },
                gridLineColor: ''
                /*visible: false,*/
               
            },
            navigator: {
                enabled: true,
                series: {
                    color: colors.blue,
                    lineWidth: 1
                }
            },
            title: {
                text: '',
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                spline: {                    
                    marker: {
                        radius: 2,
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    }
                }
            }    
        };

    	_getCPUInfo();

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

        function _getCPUReadings(){
            RestApiService.cpu.readings.$get().then(function(result){
                if(result.data){
                    var processedCPUReadings = _processCPUReadings(result.data);
                    vm.chartConfig.series = [{id:'cpuload', data: processedCPUReadings.load, color: colors.blue, name: 'CPU %', showInLegend: false}, {id:'temp', color: colors.pink, data: processedCPUReadings.temp, name: 'Temperature Cº', showInLegend: false}];
                    vm.chartConfig.xAxis.min = moment().subtract(1, 'minutes').valueOf();
                    vm.chartConfig.xAxis.max = moment().valueOf();
                    vm.lastTemp = processedCPUReadings.temp[processedCPUReadings.temp.length-1][1];
                    vm.lastLoad = processedCPUReadings.load[processedCPUReadings.load.length-1][1];

                    $timeout(function(){
                        _getCPUReadings();  
                    }, 10000);
                    vm.chartConfig.chart.width = angular.element("#cpu-chart")[0].offsetWidth-30;
                }
            }, function(error){
                // TODO: show error
            });
        };

        function _processCPUReadings(data){
            var cpuLoadValues = [];
            var cpuTempValues = [];
            data.forEach(function(entry){
                cpuLoadValues.push([moment(entry.createdAt).valueOf(), Number(entry.load.toFixed(2))]);
                cpuTempValues.push([moment(entry.createdAt).valueOf(), Number(entry.temp.toFixed(2))]);
            });

            return {load: cpuLoadValues, temp: cpuTempValues};
        }
    }

})();