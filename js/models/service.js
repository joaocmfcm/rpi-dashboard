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
Service.add = function(data, resolve, reject){
	Service.create(data).then(result => resolve(result)).catch(error => reject(error));	
};

Service.read = function(query, limit, sort, resolve, reject){
	Service.find({'name': new RegExp(query, 'i')}).limit(limit).sort(sort).then(result => resolve(result)).catch(error => reject(error));	
};

Service.edit = function(data, resolve, reject){
	var id = data._id;
	delete data._id;
	Service.update({'_id': id}, data).then(result => resolve(result)).catch(error => reject(error));	
};

Service.delete = function(id, resolve, reject){
	Service.remove({'_id': id}).then(result => resolve(result)).catch(error => reject(error));	
};

module.exports = Service;
