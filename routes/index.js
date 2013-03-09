
/*
 * GET home page.
 */

module.exports.index = function(req, res){
	res.render('index', {title: "CoolChat"});
};

module.exports.register = {
	post: function (req, res, next){
		if(req.body.username && req.body.password){
			
			// Save to mongodb and log user

			res.send('Chat');


		} else{
		
			res.send({err: 'Send username and password in tha\' form'})
		
		}

	}, get: function (req, res, next){
		res.send('Want to register? Gueit');
	}
};

module.exports.login = {
	get: function (req, res) {
		res.send('Guana login');
	}, post: function (req, res) {
		res.send('LOGIN CODE');
	}
};