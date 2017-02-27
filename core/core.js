/**
 * @description
 * Service that calls and processes data from the systeminformation node.js lib that will be served by the REST API.
 */
var si = require('systeminformation');

module.exports.getSystemInformation = function(callback){
	var systemInformation = {};

	//Callback chain to build the systemInformation object
	_getHardwareInformation(function(hardwareData){
		_getOSInformation(function(OSData){
			systemInformation = {hardware: hardwareData, os: OSData};
			callback(systemInformation);
		});
	});
};

_getHardwareInformation = function(callback){
	return si.system(callback);
};

_getOSInformation = function(callback){
	return si.osInfo(callback);
};