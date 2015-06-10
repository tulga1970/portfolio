module.exports = {
	initMe: function(app) {
		app.all('/*?', function(request, response, next) {
			response.contentType('json');
			next();
		});

		app.get('/', function(req, res) {
			res.send(req.body);
		});
	}
}