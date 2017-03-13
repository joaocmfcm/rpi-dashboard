/**
 * @description
 * Service that consumes and processes data from the systeminformation connector
 */

var logger = require('./logger.js');

var siConnector = require('./si-connector.js');

getSystemInformation = function(req, res, next){
	var p1 = new Promise(siConnector.getHardwareInformation);
	var p2 = new Promise(siConnector.getOSInformation);

	Promise.all([p1, p2]).then(values => {
		var data = {hardware: values[0], os: values[1]};
		logger.logObject(data);
		res.json(data);
	}).catch(error => {
		logger.logError(error);
		res.status(500).json(error);
	});
};

getCPUInformation = function(req, res, next){
	var p1 = new Promise(siConnector.getCPUInformation);
	var p2 = new Promise(siConnector.getCPUCurrentSpeed);
	var p3 = new Promise(siConnector.getCPUCurrentTemperature);
	var p4 = new Promise(siConnector.getCPUCurrentLoad);
	var p5 = new Promise(siConnector.getCPUFullLoad);

	Promise.all([p1, p2, p3, p4, p5]).then(values => {
		var data = {info: values[0], speed: values[1], temperature: values[2], load: values[3], fullLoad: values[4]};
		logger.logObject(data);
		res.json(data);
	}).catch(error => {
		logger.logError(error);
		res.status(500).json(error);
	});
};

getRAMUsage = function(req, res, next){
	var promise = new Promise(siConnector.getRAMUsage).then(data => {
		logger.logObject(data);
		res.json(data);
	}).catch(error => {
		logger.logError(error);
		res.status(500).json(error);
	});
};

getDrives = function(req, res, next){
	var promise = new Promise(siConnector.getDrives).then(data => {
		logger.logObject(data);
		res.json(data);
	}).catch(error => {
		logger.logError(error);
		res.status(500).json(error);
	});
};

getService = function(req, res, next){
	if(req.params.serviceName){
		var promise = new Promise(siConnector.getService.bind(null, req.params.serviceName)).then(data => {
			logger.logObject(data);
			res.json(data);

		}).catch(error => {
			logger.logError(error);
			res.status(500).json(error);
		});
	}
	else{
		res.status(404).json('Service ID not provided.');
	}
};

module.exports = {
	getSystemInformation: getSystemInformation,
	getCPUInformation: getCPUInformation,
	getRAMUsage: getRAMUsage,
	getDrives: getDrives,
	getService: getService
};
