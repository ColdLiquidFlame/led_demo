var fs = require('fs'),
	timers = require('timers'),
	moment = require('moment'),
	readline = require('readline'),
	player = require('play-sound')(),
	gpio = require('./gpio');

var sequenceFile = './sequences/shave.txt';

var sequence = [];
var step = 0;
var rl = readline.createInterface({ 
	terminal: false,
	input: fs.createReadStream(sequenceFile)
});

rl.on('line', function(line) {
	sequence.push(line);
	//console.log(line);
});

rl.on('close', function() {
	console.log(sequence.length + ' lines loaded.');
	runSequence();
});


function runSequence() {
	player.play('./audio/shave_and_a_haircut.mp3', function(err){ });
	var timeout = timers.setInterval(interval, 1);

	var currentTime = 0;
	console.log(moment().format('ddd, MMMM Do YYYY, h:mm:ss:SSSSSS'));
	function interval () {
		var currentStep = sequence[step].split(',');

		currentTime += 1;

		if (parseInt(currentStep[0]) <= currentTime) {
			console.log(currentStep);
			var pin = parseInt(currentStep[1]),
				value = parseInt(currentStep[2]);
			gpio.switchLed(pin, value)
			step += 1;
		}

		if (step >= sequence.length) {
			console.log('Step: ' + step + ' | sequence length: ' + sequence.length);
			timers.clearInterval(timeout);
			console.log(moment().format('ddd, MMMM Do YYYY, h:mm:ss:SSSSSS'));
		}
	}
}
