var wpi = require('wiring-pi');

var pin7 = 4,
    pin11 = 26;

//wpi.setup('wpi');
wpi.wiringPiSetupGpio();
wpi.pinMode(pin7, wpi.OUTPUT);
wpi.pinMode(pin11, wpi.OUTPUT);

var isLedOn = 0,
    isLed2On = 1;

var counter = 0;
var timer = setInterval(function() {
 isLedOn = +!isLedOn;
 isLed2On = +!isLed2On;

 wpi.digitalWrite(pin7,  isLedOn);
 wpi.digitalWrite(pin11, isLed2On);

 counter += 1;

 if (counter == 20) {
   console.log('shutting down');
   clearInterval(timer);
   wpi.digitalWrite(pin7, wpi.LOW);
   wpi.digitalWrite(pin11, wpi.LOW);
   process.exit();
 }
}, 500);


