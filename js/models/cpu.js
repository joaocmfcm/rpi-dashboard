/**
 * @description
 * Model to map a CPU reading in the database
 * @observations
 * 
 */
var configs = require('../configs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cpuSchema = new Schema({
	load: {type: Number, required: true},
	temp: {type: Number, required: true},
	createdAt: {type: Date, expires: configs.DB_DOCUMENT_TTL}
});

// Sets the current date so the TTL to the document can actually work. Note: the default: Date.now didn't work in this particular case of using TTL
cpuSchema.pre("save", function(next) {
    this.createdAt = new Date(); 
    next(); 
});

var CPU = mongoose.model('cpudata', cpuSchema);

// Model methods
CPU.add = function(data, resolve, reject){
	CPU.create(data).then(result => resolve(result)).catch(error => reject(error));	
};

CPU.read = function(query, limit, sort, resolve, reject){
	//CPU.find({'name': new RegExp(query, 'i')}).limit(limit).sort(sort).then(result => resolve(result)).catch(error => reject(error));	
};

CPU.edit = function(data, resolve, reject){
	var id = data._id;
	delete data._id;
	CPU.update({'_id': id}, data).then(result => resolve(result)).catch(error => reject(error));	
};

CPU.delete = function(id, resolve, reject){
	CPU.remove({'_id': id}).then(result => resolve(result)).catch(error => reject(error));	
};

module.exports = CPU;
