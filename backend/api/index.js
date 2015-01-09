[
	'Book'
].forEach(function(a){
	module.exports[a] = require('./'+a);
});