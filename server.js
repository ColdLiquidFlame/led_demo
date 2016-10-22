var express = require('express'),
    app = express(),
    apiRoutes = require('./routes/api')(io);

app.use('/api', apiRoutes);
app.use(express.static('public'));

var server = app.listen(3000, function() {
	console.log('LED app listening on 3000');
});

var io = require('socket.io').listen(server);

console.log('instatiated');

var usersConnected = 0;
// io.on('connection', function(socket) {
// 	//usersConnected += 1;
// 	//io.emit('users', usersConnected);
// 	//console.log( usersConnected + ' users connected');



// 	socket.on('disconnect', function() {
// 		usersConnected -= 1;
// 		io.emit('users', usersConnected);
// 		console.log( usersConnected + ' users connected');
// 	});
// });

io.sockets.in('/users').on('connection', function(socket) {
	usersConnected += 1;
	io.emit('users', usersConnected / 2);
	console.log( usersConnected + ' users connected');	

	socket.on('disconnect', function() {
		usersConnected -= 1;
		io.emit('users', usersConnected / 2);
		console.log( usersConnected + ' users connected');	
	});
});



exports.io = io;
