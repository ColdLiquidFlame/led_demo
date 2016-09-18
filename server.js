var express = require('express'),
    app = express(),
    apiRoutes = require('./routes/api')(io);

app.use('/api', apiRoutes);
app.use(express.static('public'));

var server = app.listen(3000, function() {
	console.log('LED app listening on 3000');
});

var io = require('socket.io').listen(server);


io.on('connection', function(socket){
	console.log('a user connected');
});

exports.io = io;
