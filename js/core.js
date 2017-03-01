/**
 * @description
 * Service that consumes and processes data from the systeminformation node.js lib that will be served by the REST API.
 */
var si = require('systeminformation');

getSystemInformation = function(callback){
	var systemInformation = {};
	_getHardwareInformation(function(hardwareData){
		_getOSInformation(function(OSData){
			systemInformation = {hardware: hardwareData, os: OSData};
			callback(systemInformation);
		});
	});
};

getCPUInformation = function(callback){
	_getCPUInformation(function(CPUData){
		callback(CPUData);
	});
};

getCPUCurrentSpeed = function(callback){
	_getCPUCurrentSpeed(function(CPUSpeedData){
		callback(CPUSpeedData);
	});
};

getCPUCurrentTemperature = function(callback){
	_getCPUCurrentTemperature(function(CPUTemperatureData){
		callback(CPUTemperatureData);
	});
};

getRAMUsage = function(callback){
	_getRAMUsage(function(RAMUsageData){
		callback(RAMUsageData);
	});
};

getDrives = function(callback){
	_getDrives(function(drivesData){
		callback(drivesData);
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
