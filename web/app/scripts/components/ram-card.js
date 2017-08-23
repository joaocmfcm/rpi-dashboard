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
        .component('ramCard', {
            controller: Controller,
            templateUrl: '/views/components/_ram-card.html',
            controllerAs: 'vm'
        });

    Controller.$inject = ['RestApiService', '$timeout', '$element', 'colors', '$scope'];

    function Controller(RestApiService, $timeout, $element, colors, $scope){
    	var vm = this;

        // Toggle to determine if the card should remotely update its data
        vm.updateCard = true;

        // Chart configuration
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
                height: 200,
                animation: false,
                alignTicks: false
            },
            xAxis: {
                type: 'datetime',
            },
            yAxis:[{
                title: {
                    text: ''
                },
                labels: {
                    style: {
                        color: colors.dashboard_red
                    },
                    formatter: function () {
                        return this.value + 'MB';
                    }
                },
                //gridLineColor: colors.dashboard_red
                /*visible: false,*/
            },{
                title: {
                    text: ''
                },
                opposite: true,
                labels: {
                    style: {
                        color: colors.dashboard_green
                    },
                    formatter: function () {
                        return this.value + 'MB';
                    }
                },
                //gridLineColor: colors.dashboard_green
                /*visible: false,*/
            }],
            navigator: {
                enabled: true,
                series: {
                    color: colors.dashboard_red,
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
    	
        // Watches the toggle to switch the data fetching for this card
        $scope.$watch('vm.updateCard', function(current, original) {
            if(current){
                _getRAMReadings();
            }
        });

        // Fetches the CPU readings stored in the server
        function _getRAMReadings(){
            RestApiService.ram.readings.$get().then(function(result){
                if(result.data){
                    var processedRAMReadings = _processRAMReadings(result.data);
                    
                    vm.chartConfig.series = [
                        {id:'ramUsed', data: processedRAMReadings.used, color: colors.dashboard_red, name: 'Used memory (MB)', showInLegend: false}, 
                        {id:'free', yAxis: 1, color: colors.dashboard_green, data: processedRAMReadings.free, name: 'Free memory (MB)', showInLegend: false}
                    ];
                    
                    vm.chartConfig.xAxis.min = moment().subtract(1, 'minutes').valueOf();
                    vm.chartConfig.xAxis.max = moment().valueOf();
                    
                    vm.lastFree = processedRAMReadings.free[processedRAMReadings.free.length-1][1];
                    vm.lastUsed = processedRAMReadings.used[processedRAMReadings.used.length-1][1];

                    vm.chartConfig.chart.width = angular.element("#cpu-chart")[0].offsetWidth-30;

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