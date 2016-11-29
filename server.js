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

app.configure(function(){
	// I need to access everything in '/public' directly
	app.use(express.static(__dirname + '/public'));

	//set the view engine
	app.engine('html', htmlEngine)
	app.set('view engine', 'html');
	app.set('views', __dirname +'/views');

	app.use(device.capture());
});


// logs every request
app.use(function(req, res, next){
	console.log({method:req.method, url: req.url, device: req.device});
	next();
});

app.get("/", function(req, res){
	res.render('index', {});
});


io.sockets.on('connection', function (socket) {

	io.sockets.emit('blast', {msg:"<span style=\"color:green !important\">someone connected</span>"});

	socket.on('blast', function(data, fn){
		console.log(data);
		io.sockets.emit('blast', {msg:data.msg});

		fn();//call the client back to clear out the field
	});

	socket.on('disconnect', function(){
        io.sockets.emit('blast', {msg:"<span style=\"color:red !important\">someone disconnected</span>"});
    });

});


server.listen(runningPortNumber);

