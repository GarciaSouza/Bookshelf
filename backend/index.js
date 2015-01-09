var restify = require('restify'),
		config = require('config'),
		api = require('./api');

var server = restify.createServer({
	name: 'Bookshelf Api',
	version: '0.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser({mapParams:false}));
server.use(restify.bodyParser({mapParams:false}));

api.Book.createApi(server);

server.listen(config.port, function(){
	console.log('%s listenning at %s', server.name, server.url);
});
