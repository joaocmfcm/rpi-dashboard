var express = require('express');

var app = express();

var bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
	res.send('Express workss');
});

app.listen(app.get('port'), function(){
	console.log("Express is running");
});