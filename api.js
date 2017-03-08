var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var routes = require('./js/routes');

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //res.header("Access-Control-Request-Headers", "X-Requested-With,Access-Control-Request-Method,Access-Control-Request-Headers, accept, Content-Type");
  next();
});

app.use('/', routes);

app.use(function (req, res, next) {
  res.status(404).send("<h1>404 route not found.</h1>");
});

app.listen(app.get('port'), function(){
	console.log("RPi system information API is now running");
});