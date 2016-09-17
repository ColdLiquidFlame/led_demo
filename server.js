var express = require('express'),
    app = express(),
    apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);
app.use(express.static('public'));


app.listen(3000, function() {
	console.log('LED app listening on 3000');
});
