module.exports.createApi = function BookCreateApi(server) {
	server.get('/book', function(req, res, next){
			res.send('Hello World! I\'m a Bookshelf :)');
			next();
	});
};