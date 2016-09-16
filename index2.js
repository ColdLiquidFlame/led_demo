var express = require('express');
var app = express();

var wpi = require('wiring-pi');
var green = 4,
    red = 26;

wpi.wiringPiSetupGpio();
wpi.pinMode(green, wpi.OUTPUT);
wpi.pinMode(red, wpi.OUTPUT);

app.get('/green', function(req, res) {
  turnAllOff();
  wpi.digitalWrite(green, wpi.HIGH);
  res.send('Green is turned on.');
});

app.get('/red', function(req, res) {
  turnAllOff();
  wpi.digitalWrite(red, wpi.HIGH);
  res.send('Red is turned on.');
});

function turnAllOff() {
  wpi.digitalWrite(red, wpi.LOW);
  wpi.digitalWrite(green, wpi.LOW);
}

 app
.listen(3000, function() {
  console.log('LED app listening on 3000');
});

process.on('SIGINT', function () {
  turnAllOff();
  process.exit();
});
