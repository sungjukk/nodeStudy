var express = require('express');
var fs = require("fs");
var session = require('express-session');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

app.use(express.static(__dirname + '/public'));

app.use(session({
	secret : '!@#$SIGN',
	resave : false,
	saveUninitalized : false
}));

var passport = require("./router/passport")(app);

app.use("/login", require("./router/login")(passport));
app.use("/quiz", require("./router/quiz"));

app.get('/',function(req,res){
	var sess = req.user;
	res.render('index',{'sess' : sess});
});

var webServer = app.listen(4000,function() {
	console.log('port 4000 serverOn');
});