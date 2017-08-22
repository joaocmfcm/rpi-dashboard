/**
 * @description
 * Model to map a RAM reading in the database
 * @observations
 * 
 */
var configs = require('../configs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ramSchema = new Schema({
	used: {type: Number, required: true},
	free: {type: Number, required: true},
	createdAt: {type: Date, expires: configs.DB_DOCUMENT_TTL}
});

// Sets the current date so the TTL to the document can actually work. Note: the default: Date.now didn't work in this particular case of using TTL
ramSchema.pre("save", function(next) {
    this.createdAt = new Date(); 
    next(); 
});

var RAM = mongoose.model('ramdata', ramSchema);

// Model methods
RAM.add = function(data, resolve, reject){
	RAM.create(data).then(result => resolve(result)).catch(error => reject(error));	
};

RAM.read = function(query, limit, sort, resolve, reject){
	//RAM.find({'name': new RegExp(query, 'i')}).limit(limit).sort(sort).then(result => resolve(result)).catch(error => reject(error));	
};

RAM.edit = function(data, resolve, reject){
	var id = data._id;
	delete data._id;
	RAM.update({'_id': id}, data).then(result => resolve(result)).catch(error => reject(error));	
};

RAM.delete = function(id, resolve, reject){
	RAM.remove({'_id': id}).then(result => resolve(result)).catch(error => reject(error));	
};

module.exports = RAM;
