/**
 * @description
 * Model to map a Drives reading in the database
 * @observations
 * 
 */
var configs = require('../configs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DrivesSchema = new Schema({
	fs: {type: String, required: true},
	size: {type: Number, required: true},
	used: {type: Number, required: true},
	createdAt: {type: Date, expires: configs.DB_DOCUMENT_TTL}
});

// Sets the current date so the TTL to the document can actually work. Note: the default: Date.now didn't work in this particular case of using TTL
DrivesSchema.pre("save", function(next) {
    this.createdAt = new Date(); 
    next(); 
});

var Drives = mongoose.model('drivesdata', DrivesSchema);

// Model methods
Drives.add = function(data, resolve, reject){
	Drives.create(data).then(result => resolve(result)).catch(error => reject(error));	
};

Drives.read = function(query, limit, sort, resolve, reject){
	Drives.find({}, '-_id load temp createdAt').limit(limit).sort(sort).then(result => resolve(result)).catch(error => reject(error));	
};

module.exports = Drives;
