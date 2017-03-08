/**
 * @description
 * Service that consumes and processes data from the systeminformation node.js lib that will be served by the REST API.
 */
var si = require('systeminformation');

var logger = require('./logger.js');

getSystemInformation = function(req, res, next){
	var p1 = new Promise(_getHardwareInformation);
	var p2 = new Promise(_getOSInformation);

	Promise.all([p1, p2]).then(values => {
		var systemInformation = {hardware: values[0], os: values[1]};
		logger.logObject(systemInformation);
		res.json(systemInformation);
	}).catch(error => {
		res.status(500).json(error);
	});
};

getCPUInformation = function(req, res, next){
	var p1 = new Promise(_getCPUInformation);
	var p2 = new Promise(_getCPUCurrentSpeed);
	var p3 = new Promise(_getCPUCurrentTemperature);
	var p4 = new Promise(_getCPUCurrentLoad);
	var p5 = new Promise(_getCPUFullLoad);

	Promise.all([p1, p2, p3, p4, p5]).then(values => {
		var cpuInformation = {info: values[0], speed: values[1], temperature: values[2], load: values[3], fullLoad: values[4]};
		logger.logObject(cpuInformation);
		res.json(cpuInformation);
	}).catch(error => {
		res.status(500).json(error);
	});
};

getRAMUsage = function(req, res, next){
	var promise = new Promise(_getRAMUsage).then(data => {
		logger.logObject(data);
		res.json(data);
	}).catch(error => {
		res.status(500).json(error);
	});
};

getDrives = function(req, res, next){
	var promise = new Promise(_getDrives).then(data => {
		logger.logObject(data);
		res.json(data);
	}).catch(error => {
		res.status(500).json(error);
	});
};

getService = function(req, res, next){
	if(req.params.serviceId){
		var promise = new Promise(_getService.bind('serviceName', req.params.serviceId)).then(data => {
			logger.logObject(data);
			res.json(data);

		}).catch(error => {
			res.status(500).json(error);
		});
	}
};

// Private methods to directly consume the systeminformation lib.
_getHardwareInformation = function(resolve, reject){
	return si.system().then(data => resolve(data)).catch(error => reject(error));
};

_getOSInformation = function(resolve, reject){
	return si.osInfo().then(data => resolve(data)).catch(error => reject(error));
};

_getCPUInformation = function(resolve, reject){
	return si.cpu().then(data => resolve(data)).catch(error => reject(error));
};

_getCPUCurrentSpeed = function(resolve, reject){
	return si.cpuCurrentspeed().then(data => resolve(data)).catch(error => reject(error));
};

_getCPUCurrentLoad = function(resolve, reject){
	return si.currentLoad().then(data => resolve(data)).catch(error => reject(error));
};

_getCPUFullLoad = function(resolve, reject){
	return si.fullLoad().then(data => resolve(data)).catch(error => reject(error));
};

_getCPUCurrentTemperature = function(resolve, reject){
	return si.cpuTemperature().then(data => resolve(data)).catch(error => reject(error));
};

_getRAMUsage = function(resolve, reject){
	return si.mem().then(data => resolve(data)).catch(error => reject(error));
};

_getDrives = function(resolve, reject){
	return si.fsSize().then(data => resolve(data)).catch(error => reject(error));
};

_getService = function(serviceName, resolve, reject){
	return si.services(serviceName).then(data => resolve(data)).catch(error => reject(error));
};

module.exports = {
	getSystemInformation: getSystemInformation,
	getCPUInformation: getCPUInformation,
	getRAMUsage: getRAMUsage,
	getDrives: getDrives,
	getService: getService
};
