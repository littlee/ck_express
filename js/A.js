module.exports = {
	ajaxLoading: function() {
		return function(req) {
			req.once('request', function() {
				document.body.className = 'loading';
			});

			req.once('end', function() {
				document.body.className = '';
			});
		};
	}
};