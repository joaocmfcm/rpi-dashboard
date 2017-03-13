var express = require('express');
var router = express.Router();

var core = require('./core.js');
var db = require('./db.js');

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
router.use('/api', _logRequest);

router.get('/api/system', core.getSystemInformation);
router.get('/api/cpu', core.getCPUInformation);
router.get('/api/ram', core.getRAMUsage);
router.get('/api/drives', core.getDrives);
router.get('/api/service/:serviceId', core.getService);

router.get('/api/dashboard/service', db.readServices);
router.post('/api/dashboard/service', db.createService);
router.put('/api/dashboard/service', db.editService);
/*router.delete('/api/dashboard/service', db.deleteService);*/

module.exports = router;
