var express = require('express');
var app = express();

app.use(function(req, res, next) {
	console.log(req.method, req.url);
	res.set('X-GitHub-Commit', process.env.GITHUB_COMMIT || process.env.HEROKU_SLUG_COMMIT);
	if(req.url === '/signed-web-apps/dist/sw/serviceworker-stub.js') {
		res.set('Service-Worker-Allowed', '/');
	}
	next();
});

app.use(express.static(__dirname + '/webapp'));

var server = app.listen(process.env.PORT || 8080, function() {
	console.log('Listening on port %d', server.address().port);
});