(function(){
	'use strict';

	/**
	 * @description
	 * Static constants used accross the app
	 * @observations
	 * 
	 */

	angular
		.module('dashboardApp')
		.constant('networkConstants', {apiUrl: 'http://localhost:3000/api/', requestTimeout: 30000})
		.constant('colors', {
			dashboard_red: 'rgb(202,53,78)',	
			dashboard_green: 'rgb(51,219,140)',
			dashboard_purple: 'rgb(119,58,247)',
			dashboard_blue: 'rgba(65,90,254,1.0)',
			dashboard_light_blue: 'rgba(94,131,255,1)',
			dashboard_turquoise: 'rgba(49,173,186,1)',
			dashboard_pink: 'rgb(228,23,102)',
			dashboard_orange: 'rgb(253,100,105)',
			dashboard_yellow: 'rgb(239,214,0)'
		})
		.constant('splineConfig', {
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
                animation: false
            },
            xAxis: {
                type: 'datetime',
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
                        radius: 0,
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1,
                            marker: {
                                radius: 1,
                            },
                        }
                    }
                }
            }
		});
})();
