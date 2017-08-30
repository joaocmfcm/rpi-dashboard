(function() {
    'use strict';

    /**
     * @description
     * Component that displays a card with the RAM information
     * @observations
     * 
     */

    angular
        .module('dashboardApp')
        .component('ramCard', {
            controller: Controller,
            templateUrl: '/views/components/_ram-card.html',
            controllerAs: 'vm'
        });

    Controller.$inject = ['RestApiService', '$timeout', '$element', 'colors', '$scope', 'splineConfig'];

    function Controller(RestApiService, $timeout, $element, colors, $scope, splineConfig){
    	var vm = this;

        // Toggle to determine if the card should remotely update its data
        vm.updateCard = true;

        // Chart configuration
        vm.chartConfig = {
            yAxis:[{
                title: {
                    text: ''
                },
                labels: {
                    style: {
                        //color: colors.dashboard_red
                    },
                    formatter: function () {
                        return this.value + 'MB';
                    }
                },
                gridLineColor: 'transparent',
                visible: false,
            },{
                title: {
                    text: ''
                },
                opposite: true,
                labels: {
                    style: {
                        //color: colors.dashboard_green
                    },
                    formatter: function () {
                        return this.value + 'MB';
                    }
                },
                gridLineColor: 'transparent',
                visible: false,
            }],
        };

        angular.extend(vm.chartConfig, splineConfig);
    	
        // Watches the toggle to switch the data fetching for this card
        $scope.$watch('vm.updateCard', function(current, original) {
            if(current){
                _getRAMReadings();
            }
        });

        // Fetches the RAM readings stored in the server
        function _getRAMReadings(){
            RestApiService.ram.readings.$get().then(function(result){
                if(result.data){
                    var processedRAMReadings = _processRAMReadings(result.data);
                    
                    vm.chartConfig.series = [
                        {id:'ramUsed', data: processedRAMReadings.used, name: 'Used memory (MB)', showInLegend: false}, 
                        {id:'free', yAxis: 1, data: processedRAMReadings.free, name: 'Free memory (MB)', showInLegend: false}
                    ];
                    
                    vm.chartConfig.xAxis.min = moment().subtract(1, 'minutes').valueOf();
                    vm.chartConfig.xAxis.max = moment().valueOf();
                    
                    vm.lastFree = processedRAMReadings.free[processedRAMReadings.free.length-1][1];
                    vm.lastUsed = processedRAMReadings.used[processedRAMReadings.used.length-1][1];

                    vm.chartConfig.chart.width = angular.element("#ram-chart")[0].offsetWidth-30;

                    $timeout(function(){
                        if(vm.updateCard) _getRAMReadings();  
                    }, 5000);
                }
            }, function(error){
                // TODO: show error
            });
        };

        // Processes the array of readings to retrieve formatted information to populate the charts
        function _processRAMReadings(data){
            var ramUsedValues = [];
            var ramFreeValues = [];
            data.forEach(function(entry){
                ramUsedValues.push([moment(entry.createdAt).valueOf(), Number(entry.used.toFixed(1))]);
                ramFreeValues.push([moment(entry.createdAt).valueOf(), Number(entry.free.toFixed(1))]);
            });

            return {used: ramUsedValues, free: ramFreeValues};
        }
    }

})();