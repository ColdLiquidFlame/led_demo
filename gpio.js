var wpi = require('wiring-pi'),
    app = require('./server'),
    green = [19, 6],
    red = [26, 13, 5],
    button = 18;

// Initialize and setup pins
wpi.wiringPiSetupGpio();
// Setup Green LEDs
function initializeOutputPin(pin) {
	wpi.pinMode(pin, wpi.OUTPUT);
	//console.log('Initializing pin:' + pin);
}
green.forEach(initializeOutputPin);
red.forEach(initializeOutputPin);

wpi.pinMode(button, wpi.INPUT);
wpi.pullUpDnControl(button, wpi.PUD_UP);
wpi.wiringPiISR(button, wpi.INT_EDGE_FALLING, function(delta) {
	console.log('Button was pressed. (' + delta + ')');
	app.io.emit('button', 'button was clicked');
});


var gpio = {};

gpio.turnAllOff = function() {
	red.forEach(function(pin) {
		wpi.digitalWrite(pin, wpi.LOW);
	});
	green.forEach(function(pin) {
		wpi.digitalWrite(pin, wpi.LOW);
	});
};

gpio.getPiVersion = function() {
	var info = wpi.piBoardId();
	console.log('Model: ' + info.model + ' | Rev: ' + info.rev);
};

gpio.toggleLed = function(led) {
	var currentLedState = wpi.digitalRead(led);
	if(currentLedState === wpi.LOW) {
		wpi.digitalWrite(led, wpi.HIGH);
	}
	else {
		wpi.digitalWrite(led, wpi.LOW);	
	}
};

gpio.switchLed = function(pin, value) {
	wpi.digitalWrite(pin, value);
}

gpio.toggleGreen = function() {
 	green.forEach(function(pin) { gpio.toggleLed(pin); });
 	

 	return gpio.getCurrentState(green);
};

gpio.toggleRed = function() {
 	red.forEach(function(pin) { gpio.toggleLed(pin); });
 	

 	return gpio.getCurrentState(red);
};

gpio.getCurrentState = function(pins) {
	var currentLedState = wpi.digitalRead(pins[0]);
	if(currentLedState === wpi.LOW) {
		return 'off';
	}
	else {
		return 'on';
	}
};


process.on('SIGINT', function () {
	console.log('Shutting down server');

 	gpio.turnAllOff();

	wpi.wiringPiISRCancel(button);

	process.exit();
});



module.exports = gpio;
