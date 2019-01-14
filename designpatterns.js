var express = require('express');

var app = express();

var handlebars = require('express-handlebars')
	.create({defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
}

app.get('/', function(req, res){
	res.render('home');
});

app.get('/home', function(req, res){
	res.render('home');
});

app.get('/designpatterns', function(req, res){
	res.type('text/plain');
	res.send('{json: Design patterns json}');
});

app.use(express.static(__dirname + '/public'));

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