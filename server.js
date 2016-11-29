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

var runningPortNumber = process.env.PORT;

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


io.sockets.on('connection', function (socket) {
	socket.on('user-connected', function(data) {
		io.sockets.emit('user-connected', { name: data.name })
	});

	socket.on('new-message', function(data, onMessageSend){
		io.sockets.emit('new-message', { msg: data.msg});
		onMessageSend();
	});

	socket.on('disconnect', function(data){
        io.sockets.emit('user-disconnected', { name: data.name });
    });

});


server.listen(runningPortNumber);

