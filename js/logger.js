const LOG_IDENTIFIER = '# ';

// Console color codes
var consoleColors = {
	reset: "\x1b[0m",
	bright: "\x1b[1m",
	dim: "\x1b[2m",
	underscore: "\x1b[4m",
	blink: "\x1b[5m",
	reverse: "\x1b[7m",
	hidden: "\x1b[8m",

	fgBlack: "\x1b[30m",
	fgRed: "\x1b[31m",
	fgGreen: "\x1b[32m",
	fgYellow: "\x1b[33m",
	fgBlue: "\x1b[34m",
	fgMagenta: "\x1b[35m",
	fgCyan: "\x1b[36m",
	fgWhite: "\x1b[37m",

	bgBlack: "\x1b[40m",
	bgRed: "\x1b[41m",
	bgGreen: "\x1b[42m",
	bgYellow: "\x1b[43m",
	bgBlue: "\x1b[44m",
	bgMagenta: "\x1b[45m",
	bgCyan: "\x1b[46m",
	bgWhite: "\x1b[47m"
};

logInfo = function(message){
	console.log(consoleColors.fgBlue + _createLogMessage(message));
};

logError = function(error){
	console.log(consoleColors.fgRed + _createLogMessage(error));
};

logObject = function(object){
	if(object){
		console.log(consoleColors.fgGreen + _createLogMessage(JSON.stringify(object)));
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