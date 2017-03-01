var express = require('express');
var router = express.Router();

var core = require('./core.js');

var logger = require('./logger.js');

_logRequest = function(req, res, next){
	logger.logInfo(req.method + ' ' + req.originalUrl);
	next();
};

/**
 * @description
 * Root
 */
router.get('/', function(req, res){
	res.send('<p>Please use the <b>/api</b> methods to get the system information.</p>');
});

/**
 * @description
 * API routes and middleware
 */

// Logs every incoming api request
router.use('/api', _logRequest);
router.get('/api/system', core.getSystemInformation);
router.get('/api/cpu', core.getCPUInformation);
router.get('/api/cpu_temperature', core.getCPUCurrentTemperature);
router.get('/api/cpu_speed', core.getCPUCurrentSpeed);
router.get('/api/ram', core.getRAMUsage);
router.get('/api/drives', core.getDrives);

module.exports = router;
