module.exports = function(app, fs) {
	app.get('/',function(req, res) {
		res.render('index',{title : 'My HomePage', length : 5});
	});
	app.get('/about',function(req, res) {
		res.send('hello about');
	});

	app.get('/list', function(req, res) {
		fs.readFile(__dirname + '/../data/' + 'user.json','utf-8', function(err, data) {
			res.end(data);
		});
	});
	app.get('/getUser/:username', function(req, res) {
		fs.readFile(__dirname + '/../data/' + 'user.json','utf-8', function(err, data) {
			var users = JSON.parse(data);
			res.json(users[req.params.username]);
			console.log(users[req.params.username]);
		});
	});
	
	app.post('/addUser/:username', function (req, res) {
		var result = {};
		var username = req.params.username;
		
		if (!req.body['password'] || !req.body['name']) {
			result['success'] = 0;
			result['error'] = 'invalid request';
			res.json(result);
			return;
		}
		
		fs.readFile(__dirname + '/../data/' + 'user.json','utf-8', function(err, data) {
			var users = JSON.parse(data);
			if (users[username]) {
				result['success'] = 0;
				result['error'] = 'deplicate';
				res.json(result);
				return;
			}
			users[username] = req.body;
			
			fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), "utf8", function(err, data){
				result = {"success": 1};
				res.json(result);
			});
		});
	});
	
	app.put('/updateUser/:username', function (req, res) {
		var username = req.params.username;
		var result = {};
		
		if (!req.body['password'] || !req.body['name']) {
			result['success'] = 0;
			result['error'] = 'invalid request';
			res.json(result);
			return;
		}
		
		fs.readFile(__dirname + '/../data/user.json','utf-8',function(err, data) {
			var users = JSON.parse(data);
			if (!users[username]) {
				result['success'] = 0;
				result['error'] = 'Not Found';
				res.json(result);
				return;
			}
			
			users[username] = req.body;
			
			fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), "utf8", function(err, data){
				result = {"success": 1};
				res.json(result);
			});
		});
	});
	
	app.delete('/deleteUser/:username', function (req, res) {
		var result = {};
		var user = req.params.username;
		fs.readFile(__dirname + '/../data/' + 'user.json','utf-8', function(err, data) {
			var users = JSON.parse(data);
			if (!users[user]) {
				result['success'] = 0;
				result['error'] = 'Not Found';
				res.json(result);
				return;
			}
			
			delete users[user];
			
			fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), "utf8", function(err, data){
				result = {"success": 1};
				res.json(result);
			});
		});
	});
}