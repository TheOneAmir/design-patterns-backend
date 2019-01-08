var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req, res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Did not find');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server fked up');
});

app.listen(app.get('port'), function(){
	console.log('Listening to port' + app.get('port'));
});