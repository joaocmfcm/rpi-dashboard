const LOG_IDENTIFIER = '# ';

logInfo = function(message){
	console.log(_createLogMessage(message));
};

logError = function(error){
	console.error(_createLogMessage(error));
};

logObject = function(object){
	if(object){
		console.log(_createLogMessage(JSON.stringify(object)));
	}
};

_createLogMessage = function(message){
	var logMessage = LOG_IDENTIFIER + new Date() + ' - ' + message;
	return logMessage;
};

module.exports = {
	logInfo: logInfo,
	logError: logError,
	logObject: logObject
};