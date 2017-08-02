var express = require("express");
var router = express.Router();

module.exports = function(passport){

	router.post("/", passport.authenticate("local", { 
			successRedirect: '/',
            failureRedirect: '/' 
        })
	)

	router.get("/success", function(req, res){
		res.json(req.user);
	})

	router.get("/fail", function(req, res){
		res.json(null);
	})

	router.get("/logout", function(req, res){
		req.logout();
		res.redirect("/");
	})

	router.get("/state", function(req, res){
		res.json(req.user || null);
	})


	return router;
}