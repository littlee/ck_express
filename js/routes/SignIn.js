module.exports = {
	path: 'signin',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/SignIn.js'));
		});
	}
};
