var request = require('superagent');
var A = require('../A.js');

module.exports = {
	signIn: function(cb) {
		request
			.get('/cooka-user-web/signin')
			.use(A.ajaxLoading())
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	}
};