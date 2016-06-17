var request = require('superagent');
var A = require('../A.js');

module.exports = {
	getData: function(cb) {
		request
			.get('/cooka-logistic-web/m/listAddr')
			.use(A.ajaxLoading())
			.use(A.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}

				// mapping data
				var d = JSON.parse(res.text);

				if (d.default === null) {
					cb({
						list: []
					});
					return;
				}

				var arr = d.undefault;
				arr.unshift(d.default);
				var dd = {
					list: arr
				};

				cb(dd);
			});
	},

	getAddrById: function(id, cb) {
		request
			.get('/cooka-logistic-web/m/findAddr')
			.query({
				deliveraddrId: id
			})
			.use(A.ajaxLoading())
			.use(A.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	},

	addAddr: function(data, cb) {
		request
			.post('/cooka-logistic-web/m/addAddr')
			.send(data)
			.use(A.ajaxLoading())
			.use(A.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	},

	updateAddr: function(data, cb) {
		request
			.post('/cooka-logistic-web/m/updateAddr')
			.send(data)
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
	},

	setDefaultAddr: function(data, cb) {
		request
			/*.post('/cooka-logistic-web/m/setDefaultAddr')
			.send({
				deliveraddrId: data
			})*/
			.get('/cooka-logistic-web/m/setDefaultAddr')
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
	},

	getMarket: function(cb) {
		request
			.get('/cooka-user-web/m/getMarket')
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