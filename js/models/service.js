/**
 * @description
 * Model to map a service that is being monitored by the dashboard
 * @observations
 * 
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceSchema = new Schema({
	name: {type: String, required: true},
	active: {type: Boolean, default: false},
	dateAdded: {type: Date, default: Date.now}
});

var Service = mongoose.model('Service', serviceSchema);

// Model methods
Service.create = function(data, resolve, reject){
	Service.create(data).then(result => resolve(result)).catch(error => reject(error));	
};

Service.read = function(query, limit, sort, resolve, reject){
	Service.find({'name': query}).limit(limit).sort(sort).then(result => resolve(result)).catch(error => reject(error));	
};

module.exports = Service;
