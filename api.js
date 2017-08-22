var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var routes = require('./js/routes');
var logger = require('./js/logger.js');
var scheduler = require('./js/scheduler');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rpi-dashboard');
mongoose.Promise = global.Promise;

scheduler.startCPUDataCollecting();
scheduler.startRAMDataCollecting();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Pragma");
  next();
});

app.use('/', routes);

app.use(function (req, res, next) {
  res.status(404).send("<h1>404 route not found.</h1>");
});

app.listen(app.get('port'), function(){
	logger.logInfo("RPi system information API is now running");
});