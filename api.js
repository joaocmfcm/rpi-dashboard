var express = require('express');

var app = express();

var bodyParser = require('body-parser');

Core = require('./core/core.js');

app.set('port', process.env.PORT || 3000);

/**
 * @description
 * Root method
 */
app.get('/', function(req, res){
	res.send('Please use the /api methods to get the system information.');
});

/**
 * @description
 * API methods
 */
app.get('/api/system', function(req, res){
	Core.getSystemInformation(function(data){
		res.json(data);
	});
});

app.listen(app.get('port'), function(){
	console.log("RPi system information API is now running");
});