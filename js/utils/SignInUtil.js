var request = require('superagent');
var A = require('../A.js');

module.exports = {
	signIn: function(data, cb) {
		request
			.post('/cooka-user-web/codeLogin')
			.use(A.ajaxLoading())
			.send(data)
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	},

	signInByPass: function(data, cb) {
		request
			.post('/cooka-user-web/passLogin')
			.use(A.ajaxLoading())
			.send(data)
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	},

	getCode: function(phone, cb) {
		request
			.get('/cooka-user-web/getVerificationCode')
			.query({
				phone: phone
			})
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	}
};