var wpi = require('wiring-pi'),
    app = require('./server'),
    green = 4,
    red = 26,
    button = 13;

// Initialize and setup pins
wpi.wiringPiSetupGpio();
wpi.pinMode(green, wpi.OUTPUT);
wpi.pinMode(red, wpi.OUTPUT);

wpi.pinMode(button, wpi.INPUT);
wpi.pullUpDnControl(button, wpi.PUD_UP);
wpi.wiringPiISR(button, wpi.INT_EDGE_FALLING, function(delta) {
	console.log('Button was pressed. (' + delta + ')');
	app.io.emit('button', 'button was clicked');
});


var gpio = {};

gpio.turnAllOff = function() {
	wpi.digitalWrite(red, wpi.LOW);
	wpi.digitalWrite(green, wpi.LOW);
};

gpio.turnOnGreen = function() {
	gpio.turnAllOff();

	console.log('Green: ' + green + ' | Value: ' + wpi.HIGH);
	wpi.digitalWrite(green, wpi.HIGH);
};

gpio.turnOnRed = function() {
	gpio.turnAllOff();

	console.log('Red: ' + red + ' | Value: ' + wpi.HIGH);
	wpi.digitalWrite(red, wpi.HIGH);
};

gpio.getPiVersion = function() {
	var info = wpi.piBoardId();
	console.log('Model: ' + info.model + ' | Rev: ' + info.rev);
};

gpio.toggleLed = function(led) {
	var currentLedState = wpi.digitalRead(led);
	if(currentLedState === wpi.LOW) {
		wpi.digitalWrite(led, wpi.HIGH);
		return 'on';
	}
	else {
		wpi.digitalWrite(led, wpi.LOW);
		return 'off';
	}
};

gpio.toggleGreen = function() {
 	return gpio.toggleLed(green);
};

gpio.toggleRed = function() {
 	return gpio.toggleLed(red);
};


process.on('SIGINT', function () {
	console.log('Shutting down server');

 	gpio.turnAllOff();

	wpi.wiringPiISRCancel(button);

	process.exit();
});



module.exports = gpio;
