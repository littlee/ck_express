var request = require('superagent');

module.exports = {
	getData: function(cb) {
		request
			.get('https://baconipsum.com/api/')
			.query({
				type: 'meat-and-filler'
			})
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	}
};