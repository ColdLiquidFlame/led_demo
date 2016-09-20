var express = require('express'),
    gpio = require('../gpio');
    //app = require('../server');

var router = express.Router();



module.exports = function(io) {
	router.get('/green', function(req, res) {
		var finalState = gpio.toggleGreen();
		//app.io.emit('button', 'Green is turned  ' + finalState + '.');
		res.json({});
	});

	router.get('/red', function(req, res) {
		var finalState = gpio.toggleRed();
		//app.io.emit('button', 'Red is turned  ' + finalState + '.');
		res.json({});
	});

	return router;
};

