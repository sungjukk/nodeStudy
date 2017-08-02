var express = require("express");
var router = express.Router();


router.get("/", function(req, res){
	var sess = req.user;
	res.render('quiz',{'sess':sess});
});
module.exports = router;