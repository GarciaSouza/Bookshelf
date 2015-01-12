var restify = require('restify'),
    config = require('config'),
    api = require('./api'),
    mongoose = require('mongoose');

var server = restify.createServer({
  name: 'Bookshelf Api',
  version: '0.0.0'
});

mongoose.connect(config.db);

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser({mapParams:false}));
server.use(restify.bodyParser({mapParams:false}));

api.Book.createApi(server);

server.get(/\/app\/?.*/, restify.serveStatic({
  directory: '../frontend',
  default: 'index.html'
}));

server.listen(config.port, function(){
  console.log('%s listenning at %s', server.name, server.url);
});

function closeApp() {
  mongoose.disconnect(function(){
    process.exit(0);
  });
}

process.on('SIGINT', closeApp);