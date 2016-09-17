var express = require('express'),
    gpio = require('../gpio');

var router = express.Router();

router.get('/green', function(req, res) {
	gpio.turnOnGreen();	
	res.json({ message: 'Green is turned on.'});
});

router.get('/red', function(req, res) {
	gpio.turnOnRed();
	res.json({ message: 'Red is turned on.'});
});

module.exports = router;

