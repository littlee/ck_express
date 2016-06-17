var request = require('superagent');
var A = require('../A.js');

module.exports = {
	getAddress: function(cb) {
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

	getLogistic: function(q, cb) {
		request
			.get('/cooka-user-web/m/getLogisticCompanyForDeliver')
			.query(q)
			.use(A.ajaxLoading())
			.use(A.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	},

	getFreightCenter: function(cb) {
		request
			.get('/cooka-user-web/m/getFreightCenter')
			.use(A.ajaxLoading())
			.use(A.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	},

	submit: function(fd, cb) {
		request
			.post('/cooka-user-web/m/diliverHandler')
			.send(fd)
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	}
};