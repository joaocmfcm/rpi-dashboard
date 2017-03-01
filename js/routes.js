var express = require('express');
var router = express.Router();

var core = require('./core.js');

/**
 * @description
 * Root
 */
router.get('/', function(req, res){
	res.send('<p>Please use the <b>/api</b> methods to get the system information.</p>');
});

/**
 * @description
 * API routes
 * TODO: dont declare the functions logic on the middleware - call the function directly
 */
router.get('/api/system', function(req, res){
	core.getSystemInformation(function(data){
		res.json(data);
	});
});

router.get('/api/cpu', function(req, res){
	core.getCPUInformation(function(data){
		res.json(data);
	});
});

router.get('/api/cpu_temperature', function(req, res){
	core.getCPUCurrentTemperature(function(data){
		res.json(data);
	});
});

router.get('/api/cpu_speed', function(req, res){
	core.getCPUCurrentSpeed(function(data){
		res.json(data);
	});
});

router.get('/api/ram', function(req, res){
	core.getRAMUsage(function(data){
		res.json(data);
	});
});

router.get('/api/drives', function(req, res){
	core.getDrives(function(data){
		res.json(data);
	});
});

module.exports = router;
