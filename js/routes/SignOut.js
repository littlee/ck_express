module.exports = {
	path: 'signout',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/SignOut.js'));
		});
	}
};
