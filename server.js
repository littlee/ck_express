var express = require('express');
var rewrite = require('express-urlrewrite');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var WebpackConfig = require('./webpack.dev.js');
var fs = require('fs');
var path = require('path');

fs.createReadStream('./dev.html').pipe(fs.createWriteStream('./index.html'));

var app = express();

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
	publicPath: '/__build__/',
	hot: true,
	historyApiFallback: true,
	stats: {
		colors: true
	}
}));

app.use(express.static(__dirname));

app.get('*', function(request, response) {
	response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(3333, function() {
	console.log('Server listening on http://localhost:3333, Ctrl+C to stop');
});
