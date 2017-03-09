/**
 * @description
 * Systeminformation connector
 */

var si = require('systeminformation');

getHardwareInformation = function(resolve, reject){
	return si.system().then(data => resolve(data)).catch(error => reject(error));
};

getOSInformation = function(resolve, reject){
	return si.osInfo().then(data => resolve(data)).catch(error => reject(error));
};

getCPUInformation = function(resolve, reject){
	return si.cpu().then(data => resolve(data)).catch(error => reject(error));
};

getCPUCurrentSpeed = function(resolve, reject){
	return si.cpuCurrentspeed().then(data => resolve(data)).catch(error => reject(error));
};

getCPUCurrentLoad = function(resolve, reject){
	return si.currentLoad().then(data => resolve(data)).catch(error => reject(error));
};

getCPUFullLoad = function(resolve, reject){
	return si.fullLoad().then(data => resolve(data)).catch(error => reject(error));
};

getCPUCurrentTemperature = function(resolve, reject){
	return si.cpuTemperature().then(data => resolve(data)).catch(error => reject(error));
};

getRAMUsage = function(resolve, reject){
	return si.mem().then(data => resolve(data)).catch(error => reject(error));
};

getDrives = function(resolve, reject){
	return si.fsSize().then(data => resolve(data)).catch(error => reject(error));
};

getService = function(serviceName, resolve, reject){
	return si.services(serviceName).then(data => resolve(data)).catch(error => reject(error));
};

module.exports = {
	getHardwareInformation: getHardwareInformation,
	getOSInformation: getOSInformation,
	getCPUInformation: getCPUInformation,
	getCPUCurrentSpeed: getCPUCurrentSpeed,
	getCPUCurrentLoad: getCPUCurrentLoad,
	getCPUFullLoad: getCPUFullLoad,
	getCPUCurrentTemperature: getCPUCurrentTemperature,
	getRAMUsage: getRAMUsage,
	getDrives: getDrives,
	getService: getService
};
