var express = require('express');
var http = require("http");
var app = express();
var router = require('./router/routerMain.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs");

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

app.use(express.static(__dirname + '/public'));

app.use(session({
		secret : '@#@$MYSIGN@$#$',
		resave : false,
		saveUninitialized : true
}));

router(app,fs);

var webServer = app.listen(3000,function() {
	console.log('port 3000 serverOn');
});
/*var server = http.createServer(function(request, response) {
	response.writeHead(200, {'Content-Type' : 'text/plain'});
	response.end('Hello World');
}).listen(10001, function (){
	console.log("serverOn");
});*/