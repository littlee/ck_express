var request = require('superagent');
var A = require('../A.js');

module.exports = {
	getData: function(q, cb) {
		request
			.get('/cooka-user-web/m/orderDetail')
			.query(q)
			.use(A.ajaxLoading())
			.use(A.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	}
};