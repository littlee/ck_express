var request = require('superagent');
var A = require('../A.js');

module.exports = {
	getData: function(cb) {
		request
			.get('/js/data/logi.json')
			.use(A.ajaxLoading())
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	},

	submit: function(fd, cb) {
		request
			.post('/cooka-user-web/m/getGoldLogisticMessage')
			.send(fd)
			.use(A.ajaxLoading())
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	}
};