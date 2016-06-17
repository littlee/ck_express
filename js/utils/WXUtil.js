var request = require('superagent');
var A = require('../A.js');

module.exports = {
	callback: function(code, cb) {
		request
			.get('/cooka-user-web/weiXinCallback')
			.query({
				code: code
			})
			.use(A.ajaxLoading())
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
			.use(A.ajaxLoading())
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	},

	bindPhone: function(data, cb) {
		request
			.post('/cooka-user-web/wxBindPhone')
			.send(data)
			.use(A.ajaxLoading())
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	}
};
