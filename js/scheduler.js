/**
 * @description
 * Service that allows the server to run scheduled tasks
 */

var cron = require('cron');
var logger = require('./logger.js');
var db = require('./db.js');
var siConnector = require('./si-connector.js');

startCPUDataCollecting = function(){
	logger.logInfo('Starting the scheduling of CPU data collecting');
	var job = cron.job("*/5 * * * * *", function(){
		var p1 = new Promise(siConnector.getCPUCurrentTemperature);
		var p2 = new Promise(siConnector.getCPUCurrentLoad);

		Promise.all([p1, p2]).then(values => {
			var data = {temp: values[0].main, load: values[1].currentload};
	    	db.createCPUReading(data);
		}).catch(error => {
			logger.logError(error);
		});
	}); 
	job.start();
};

startRAMDataCollecting = function(){
	logger.logInfo('Starting the scheduling of RAM data collecting');
	var job = cron.job("*/5 * * * * *", function(){
		var promise = new Promise(siConnector.getRAMUsage).then(data => {
			//console.log('TOTAL:',data.total/1024/1024 + 'MB', 'USED:', data.used/1024/1024 + 'MB', 'FREE:',data.free/1024/1024 + 'MB', 'AVAIL:',data.available/1024/1024 + 'MB')
			db.createRAMReading({used: data.used/1024/1024, free: data.free/1024/1024});
		}).catch(error => {
			logger.logError(error);
		});
	}); 
	job.start();
};

module.exports = {
	startCPUDataCollecting: startCPUDataCollecting,
	startRAMDataCollecting: startRAMDataCollecting
};