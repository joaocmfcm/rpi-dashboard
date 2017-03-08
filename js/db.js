/**
 * @description
 * Service that displays the interfaces to communicate with models in the DB
 * @observations
 * 
 */

var service = require('./models/service.js');
var logger = require('./logger.js');

_createService = function(req, res){
	var data = req.body;
	var promise = new Promise(service.add.bind('data', data)).then(result => {
		logger.logObject(result);
		res.json(result);
	}).catch(error => {
		res.status(500).json(error);
	});
};

_readServices = function(req, res){
	var query, sort, limit;
		
	query = req.query.query ? req.query.query : '';
	limit = req.query.limit ? Number(req.query.limit) : 1000;
	sort = req.query.sort ? req.query.sort : '+name';

	var promise = new Promise(service.read.bind('data', query, limit, sort)).then(result => {
		logger.logObject(result);
		res.json(result);
	}).catch(error => {
		res.status(500).json(error);
	});
};

module.exports = {
	createService: _createService,
	readServices: _readServices
};