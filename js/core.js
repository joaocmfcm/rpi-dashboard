/**
 * @description
 * Service that consumes and processes data from the systeminformation node.js lib that will be served by the REST API.
 */
var si = require('systeminformation');

var logger = require('./logger.js');

getSystemInformation = function(req, res, next){
	var systemInformation = {};
	_getHardwareInformation(function(hardwareData){
		_getOSInformation(function(OSData){
			systemInformation = {hardware: hardwareData, os: OSData};
			logger.logObject(systemInformation);
			res.json(systemInformation);
		});
	});
};

getCPUInformation = function(req, res, next){
	_getCPUInformation(function(CPUData){
		res.json(CPUData);
		next();
	});
};

getCPUCurrentSpeed = function(req, res, next){
	_getCPUCurrentSpeed(function(CPUSpeedData){
		res.json(CPUSpeedData);
		next();
	});
};

getCPUCurrentTemperature = function(req, res, next){
	_getCPUCurrentTemperature(function(CPUTemperatureData){
		res.json(CPUTemperatureData);
		next();
	});
};

getRAMUsage = function(req, res, next){
	_getRAMUsage(function(RAMUsageData){
		res.json(RAMUsageData);
		next();
	});
};

getDrives = function(req, res, next){
	_getDrives(function(drivesData){
		res.json(drivesData);
		next();
	});
};

_getHardwareInformation = function(callback){
	return si.system(callback);
};

_getOSInformation = function(callback){
	return si.osInfo(callback);
};

_getCPUInformation = function(callback){
	return si.cpu(callback);
};

_getCPUCurrentSpeed = function(callback){
	return si.cpuCurrentSpeed(callback);
};

_getCPUCurrentTemperature = function(callback){
	return si.cpuTemperature(callback);
};

_getRAMUsage = function(callback){
	return si.mem(callback);
};

_getDrives = function(callback){
	return si.blockDevices(callback);
};

module.exports = {
	getSystemInformation: getSystemInformation,
	getCPUInformation: getCPUInformation,
	getCPUCurrentSpeed: getCPUCurrentSpeed,
	getCPUCurrentTemperature: getCPUCurrentTemperature,
	getRAMUsage: getRAMUsage,
	getDrives: getDrives
};
