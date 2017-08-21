/**
 * @description
 * Service that provides the interfaces to communicate with models in the DB
 * @observations
 * 
 */

var service = require('./models/service.js');
var logger = require('./logger.js');

createService = function(req, res){
	var data = req.body;
	var promise = new Promise(service.add.bind(null, data)).then(result => {
		logger.logObject(result);
		res.json(result);
	}).catch(error => {
		logger.logError(error);
		res.status(500).json(error);
	});
};

readServices = function(req, res){
	var query, sort, limit;
		
	query = req.query.query ? req.query.query : '';
	limit = req.query.limit ? Number(req.query.limit) : 1000;
	sort = req.query.sort ? req.query.sort : '+name';

	var promise = new Promise(service.read.bind(null, query, limit, sort)).then(result => {
		logger.logObject(result);
		res.json(result);
	}).catch(error => {
		logger.logError(error);
		res.status(500).json(error);
	});
};

editService = function(req, res){
	var data = req.body;

	var promise = new Promise(service.edit.bind(null, data)).then(result => {
		logger.logObject(result);
		res.json(result);
	}).catch(error => {
		logger.logError(error);
		res.status(500).json(error);
	});
};

deleteService = function(req, res){
	var id = req.params.id;

	var promise = new Promise(service.delete.bind(null, id)).then(result => {
		logger.logObject(result);
		res.json(result);
	}).catch(error => {
		logger.logError(error);
		res.status(500).json(error);
	});
};

module.exports = {
	createService: createService,
	readServices: readServices,
	editService: editService,
	deleteService: deleteService
};