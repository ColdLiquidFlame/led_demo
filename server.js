var express = require('express'),
    app = express(),
    apiRoutes = require('./routes/api');

// Initialize and setup pins
/*wpi.wiringPiSetupGpio();
wpi.pinMode(green, wpi.OUTPUT);
wpi.pinMode(red, wpi.OUTPUT);

wpi.pinMode(button, wpi.INPUT);
wpi.pullUpDnControl(button, wpi.PUD_UP);
wpi.wiringPiISR(button, wpi.INT_EDGE_FALLING, function(delta) {
	console.log('Button was pressed. (' + delta + ')');
});
*/
// Setup routes

app.use('/api', apiRoutes);
app.use(express.static('public'));


app.listen(3000, function() {
	console.log('LED app listening on 3000');
});

// Functions
/*function turnAllOff() {
	wpi.digitalWrite(red, wpi.LOW);
	wpi.digitalWrite(green, wpi.LOW);
}*/

// Events
