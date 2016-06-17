var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var fs = require('fs');
fs.createReadStream('./dev.html').pipe(fs.createWriteStream('./index.html'));
var config = require('./webpack.dev.js');

var PORT = 3333;

new WebpackDevServer(webpack(config), {
	publicPath: '/__build__/',
	hot: true,
	historyApiFallback: true,
	stats: {
		colors: true
	}
}).listen(PORT, 'localhost', function(err) {
	if (err) {
		console.log(err);
		return;
	}
	console.log(':::Server Running::: ==> localhost:' + PORT);
});
