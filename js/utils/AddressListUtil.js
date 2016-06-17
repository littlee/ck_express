var request = require('superagent');
var A = require('../A.js');

module.exports = {

	listAddr: function(cb) {
		request
			.get('/cooka-logistic-web/m/listAddr')
			.use(A.ajaxLoading())
			.use(A.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},

	delAddr: function(data, cb) {
		request
			/*.post('/cooka-logistic-web/m/delAddr')
			.send({
				deliveraddrId: data
			})*/
			.get('/cooka-logistic-web/m/delAddr')
			.query({
				deliveraddrId: data
			})
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