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
	var cpuInformation = {};
	_getCPUInformation(function(CPUData){
		_getCPUCurrentSpeed(function(CPUSpeedData){
			_getCPUCurrentTemperature(function(CPUTemperatureData){
				_getCPUCurrentTemperature(function(CPUCurrentLoadData){
					_getCPUFullLoad(function(CPUFullLoadData){
						cpuInformation = {info: CPUData, speed: CPUSpeedData, temperature: CPUTemperatureData, load: CPUCurrentLoadData, fullLoad: CPUFullLoadData};
						res.json(cpuInformation);
					});
				});
			});
		});
	});
};

getRAMUsage = function(req, res, next){
	_getRAMUsage(function(RAMUsageData){
		res.json(RAMUsageData);
	});
};

getDrives = function(req, res, next){
	_getDrives(function(drivesData){
		res.json(drivesData);
	});
};

getService = function(req, res, next){
	if(req.params.serviceId){
		_getService(req.params.serviceId, function(serviceData){
			res.json(serviceData);
		});
	}
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
	return si.cpuCurrentspeed(callback);
};

_getCPUCurrentLoad = function(callback){
	return si.currentLoad(callback);
};

_getCPUFullLoad = function(callback){
	return si.fullLoad(callback);
};

_getCPUCurrentTemperature = function(callback){
	return si.cpuTemperature(callback);
};

_getRAMUsage = function(callback){
	return si.mem(callback);
};

_getDrives = function(callback){
	return si.fsSize(callback);
};

_getService = function(serviceName, callback){
	return si.services(serviceName, callback);
};

module.exports = {
	getSystemInformation: getSystemInformation,
	getCPUInformation: getCPUInformation,
	getRAMUsage: getRAMUsage,
	getDrives: getDrives,
	getService: getService
};
