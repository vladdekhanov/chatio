/*************************************
//
// chatio app
//
**************************************/

var express = require('express');
var app = express();
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);
var device  = require('express-device');
var htmlEngine = require('ejs').renderFile;

var runningPortNumber = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public', {
	dotfiles: 'ignore',
	etag: false,
	extensions: ['htm', 'html'],
	index: false,
	maxAge: '1d',
	redirect: false,
	setHeaders: function (res, path, stat) {
		res.set('x-timestamp', Date.now())
	}
}));

//set the view engine
app.engine('html', htmlEngine)
app.set('view engine', 'html');
app.set('views', __dirname +'/views');

app.use(device.capture());


// logs every request
app.use(function(req, res, next){
	console.log({method:req.method, url: req.url, device: req.device});
	next();
});

app.get("/", function(req, res){
	res.render('index', {});
});

var clientsBase = [];

var refreshStats = function() {
	var stats = {
		userQty: clientsBase.length
	};
	io.sockets.emit('refresh-stats', stats)
};

io.sockets.on('connection', function (socket) {
	socket.on('user-connected', function(user) {
		clientsBase.push({ id: socket.id, name: user.name });
		io.sockets.emit('user-connected', user.name)
		refreshStats();
	});

	socket.on('new-message', function(data, cleanClientNameFn){
		io.sockets.emit('new-message', data);
		cleanClientNameFn();
	});

	socket.on('disconnect', function(){
		var user = clientsBase.filter(function(user){ return user.id == socket.id; })[0];
		if (user) {
			io.sockets.emit('user-disconnected', user.name);
			clientsBase.splice(clientsBase.indexOf(user), 1);
			refreshStats();
		}
    });
});


server.listen(runningPortNumber);

