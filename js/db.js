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
	var query = '',
		limit = 1000,
		sort = '+name';
		
	if(req.query.query) query = req.query.query;
	if(req.query.limit) limit = Number(req.query.limit);
	if(req.query.sort) sort = req.query.sort;

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