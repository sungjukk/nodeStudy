var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var user = {};
module.exports = function(app) {
	app.use(passport.initialize());
	app.use(passport.session());

	passport.use(new LocalStrategy(function(username,password,done){
		if (username == 'asdf' && password == 'asdf')
		{
			user.username = username;
			user.password = password;
			done(null,user);
		} else {
			done(null,null);
		}
	}));

	passport.serializeUser(function(user,done){
		done(null, user);
	});

	passport.deserializeUser(function(user,done){
		done(null, user);
	});

	return passport;
}